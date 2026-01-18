const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Route autentikasi
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, profile_image } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Cek apakah email sudah ada
    const [existingUser] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Insert user baru
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, profile_image) VALUES (?, ?, ?, ?)',
      [name, email, password, profile_image || null]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: result.insertId,
        name,
        email,
        profile_image: profile_image || null
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Cari user
    const [users] = await db.query(
      'SELECT id, name, email, profile_image FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];
    res.json({
      message: 'Login successful',
      user: user
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { id } = req.params;

    // Cek apakah user ada
    const [userRows] = await connection.query('SELECT id FROM users WHERE id = ?', [id]);
    if (userRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'User not found' });
    }

    // Hapus user (cascade akan menangani keranjang dan pesanan)
    await connection.query('DELETE FROM users WHERE id = ?', [id]);

    await connection.commit();
    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        p.id,
        p.name,
        c.name as category,
        p.price,
        p.image_path as image
      FROM products p
      JOIN categories c ON p.category_id = c.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/cart - Tambah item ke keranjang
app.post('/api/cart', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Validasi field yang diperlukan
    if (!user_id || !product_id || quantity === undefined || quantity === null) {
      return res.status(400).json({ error: 'user_id, product_id, and quantity are required' });
    }

    // Cek apakah user ada
    const [userRows] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cek apakah produk ada
    const [productRows] = await db.query('SELECT id FROM products WHERE id = ?', [product_id]);
    if (productRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Cek apakah item sudah ada di keranjang
    const [existingCart] = await db.query(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    if (existingCart.length > 0) {
      const newQuantity = existingCart[0].quantity + quantity;

      if (newQuantity <= 0) {
        // Hapus item dari keranjang jika jumlah menjadi 0 atau negatif
        await db.query('DELETE FROM cart_items WHERE id = ?', [existingCart[0].id]);
        res.json({ message: 'Item removed from cart successfully' });
      } else {
        // Update jumlah
        await db.query(
          'UPDATE cart_items SET quantity = ? WHERE id = ?',
          [newQuantity, existingCart[0].id]
        );
        res.json({ message: 'Cart item updated successfully' });
      }
    } else {
      // Hanya tambah item baru jika jumlah positif
      if (quantity > 0) {
        await db.query(
          'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [user_id, product_id, quantity]
        );
        res.status(201).json({ message: 'Item added to cart successfully' });
      } else {
        return res.status(400).json({ error: 'Cannot add item with negative or zero quantity' });
      }
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/cart/:userId - Dapatkan keranjang user
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Validasi user ada
    const [userRows] = await db.query('SELECT id FROM users WHERE id = ?', [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Dapatkan item keranjang dengan detail produk
    const [cartItems] = await db.query(`
      SELECT
        ci.id,
        ci.quantity,
        ci.added_at,
        p.id as product_id,
        p.name,
        p.price,
        p.image_path,
        c.name as category_name
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      JOIN categories c ON p.category_id = c.id
      WHERE ci.user_id = ?
      ORDER BY ci.added_at DESC
    `, [userId]);

    // Hitung total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      items: cartItems,
      total: total,
      itemCount: cartItems.length
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/orders - Buat pesanan dari keranjang
app.post('/api/orders', async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { user_id } = req.body;

    // Validasi user
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const [userRows] = await connection.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Dapatkan item keranjang
    const [cartItems] = await connection.query(`
      SELECT ci.product_id, ci.quantity, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [user_id]);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [user_id, totalAmount]
    );
    const orderId = orderResult.insertId;

    // Insert order items
    const orderItemsData = cartItems.map(item => [
      orderId,
      item.product_id,
      item.quantity,
      item.price
    ]);

    await connection.query(
      'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ?',
      [orderItemsData]
    );

    // Clear cart
    await connection.query('DELETE FROM cart_items WHERE user_id = ?', [user_id]);

    await connection.commit();

    res.status(201).json({
      message: 'Order created successfully',
      orderId: orderId,
      totalAmount: totalAmount
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
