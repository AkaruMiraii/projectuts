import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ImageSourcePropType
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButtonComponent from '../components/IconButtonComponent';
import api, { CartResponse } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import CustomPopup from '../components/CustomPopup';

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'error' | 'success' | 'info'>('info');

  const fetchCart = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await api.getCart(user.id);
      setCartData(data);
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  const updateCartItem = async (productId: number, quantityChange: number) => {
    if (!user) return;

    try {
      setUpdating(true);
      await api.updateCartItem({
        user_id: user.id,
        product_id: productId,
        quantity: quantityChange
      });
      // Refresh keranjang setelah update
      await fetchCart();
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } finally {
      setUpdating(false);
    }
  };

  const handleIncreaseQuantity = (productId: number) => {
    updateCartItem(productId, 1);
  };

  const handleDecreaseQuantity = (productId: number) => {
    updateCartItem(productId, -1);
  };

  const handleRemoveItem = (productId: number) => {
    updateCartItem(productId, -999);
  };

  const handleCheckout = async () => {
    if (!user) {
      setPopupTitle('Error');
      setPopupMessage('Silakan login terlebih dahulu');
      setPopupType('error');
      setPopupVisible(true);
      return;
    }

    if (!cartData || cartData.items.length === 0) {
      setPopupTitle('Error');
      setPopupMessage('Keranjang kosong');
      setPopupType('error');
      setPopupVisible(true);
      return;
    }

    try {
      setUpdating(true);
      await api.createOrder({ user_id: user.id });
      setPopupTitle('Berhasil');
      setPopupMessage('Pesanan berhasil dibuat!');
      setPopupType('success');
      setPopupVisible(true);
      // Refresh keranjang (seharusnya kosong sekarang)
      await fetchCart();
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setPopupTitle('Error');
      setPopupMessage('Gagal membuat pesanan');
      setPopupType('error');
      setPopupVisible(true);
    } finally {
      setUpdating(false);
    }
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  // Map string gambar API ke require() untuk gambar lokal
  const getImageSource = (imageName: string | null): ImageSourcePropType => {
    if (!imageName) return require('../assets/images/croissant_chocolate-removebg-preview.png');

    const imageMap: { [key: string]: ImageSourcePropType } = {
      'choux_fix-removebg-preview.png': require('../assets/images/choux_fix-removebg-preview.png'),
      'caramel_latte-removebg-preview.png': require('../assets/images/caramel_latte-removebg-preview.png'),
      'croissant_chocolate-removebg-preview.png': require('../assets/images/croissant_chocolate-removebg-preview.png'),
      'macaroon-removebg-preview.png': require('../assets/images/macaroon-removebg-preview.png'),
      'eclair_chocolat-removebg-preview.png': require('../assets/images/eclair_chocolat-removebg-preview.png'),
      'Pistachio-removebg-preview.png': require('../assets/images/Pistachio-removebg-preview.png'),
    };

    return imageMap[imageName] || require('../assets/images/croissant_chocolate-removebg-preview.png');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#795548" />
        <Text style={styles.loadingText}>Loading cart...</Text>
      </View>
    );
  }

  const cartItems = cartData?.items || [];
  const totalPrice = cartData?.total || 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Keranjang</Text>
          <IconButtonComponent
            iconName="arrow-back-outline"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      <View style={styles.content}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyText}>Keranjang kosong</Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopButtonText}>Belanja Sekarang</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={getImageSource(item.image)} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={[styles.quantityButton, updating && styles.disabledButton]}
                      onPress={() => handleDecreaseQuantity(item.product_id)}
                      disabled={updating}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={[styles.quantityButton, updating && styles.disabledButton]}
                      onPress={() => handleIncreaseQuantity(item.product_id)}
                      disabled={updating}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.product_id)}
                  disabled={updating}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout} disabled={updating}>
              <Text style={styles.checkoutButtonText}>
                {updating ? 'Processing...' : 'Checkout'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <CustomPopup
        visible={popupVisible}
        title={popupTitle}
        message={popupMessage}
        type={popupType}
        onClose={() => setPopupVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffaa',
  },
  header: {
    backgroundColor: '#795548',
    height: 120,
    paddingTop: 35,
    paddingHorizontal: 20,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    justifyContent: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffaa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#795548',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#795548',
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#999',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#795548',
  },
  checkoutButton: {
    backgroundColor: '#795548',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;