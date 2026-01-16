const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        p.id,
        p.name,
        c.name as category,
        p.price,
        p.liked,
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

// POST /api/cart - Add item to cart
app.post('/api/cart', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Validate required fields
    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({ error: 'user_id, product_id, and quantity are required' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0' });
    }

    // Check if user exists
    const [userRows] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if product exists
    const [productRows] = await db.query('SELECT id FROM products WHERE id = ?', [product_id]);
    if (productRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if item already in cart
    const [existingCart] = await db.query(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    if (existingCart.length > 0) {
      // Update quantity
      await db.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
        [quantity, existingCart[0].id]
      );
      res.json({ message: 'Cart item updated successfully' });
    } else {
      // Insert new item
      await db.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [user_id, product_id, quantity]
      );
      res.status(201).json({ message: 'Item added to cart successfully' });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/cart/:userId - Get user's cart
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user exists
    const [userRows] = await db.query('SELECT id FROM users WHERE id = ?', [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get cart items with product details
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

    // Calculate total
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

// POST /api/orders - Create order from cart
app.post('/api/orders', async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { user_id } = req.body;

    // Validate user
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const [userRows] = await connection.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get cart items
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
