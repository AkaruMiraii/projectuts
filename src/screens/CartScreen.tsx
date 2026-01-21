import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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

  // ambil data keranjang dari server
  const fetchCart = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await api.getCart(user.id);
      setCartData(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  // update quantity item
  const updateCartItem = async (productId: number, quantityChange: number) => {
    if (!user) return;

    try {
      setUpdating(true);
      await api.updateCartItem({
        user_id: user.id,
        product_id: productId,
        quantity: quantityChange,
      });
      await fetchCart();
    } finally {
      setUpdating(false);
    }
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
      setPopupMessage('Pesanan berhasil dibuat');
      setPopupType('success');
      setPopupVisible(true);
      await fetchCart();
    } catch {
      setPopupTitle('Error');
      setPopupMessage('Gagal membuat pesanan');
      setPopupType('error');
      setPopupVisible(true);
    } finally {
      setUpdating(false);
    }
  };

  const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

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
              onPress={() => navigation.navigate('MenuScreen')}
            >
              <Text style={styles.shopButtonText}>Belanja Sekarang</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price)}
                  </Text>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={[styles.quantityButton, updating && styles.disabledButton]}
                      onPress={() => updateCartItem(item.product_id, -1)}
                      disabled={updating}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={[styles.quantityButton, updating && styles.disabledButton]}
                      onPress={() => updateCartItem(item.product_id, 1)}
                      disabled={updating}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => updateCartItem(item.product_id, -999)}
                  disabled={updating}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              disabled={updating}
            >
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
  container: { flex: 1, backgroundColor: '#ffffffaa' },

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
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  content: { padding: 20 },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: { marginTop: 10, color: '#666' },

  emptyCart: {
    alignItems: 'center',
    paddingVertical: 100,
  },

  emptyText: { fontSize: 18, marginBottom: 20 },

  shopButton: {
    backgroundColor: '#795548',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },

  shopButtonText: { color: '#fff', fontWeight: 'bold' },

  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  itemInfo: { flex: 1 },

  itemName: { fontSize: 16, fontWeight: 'bold' },

  itemPrice: { color: '#795548', marginTop: 4 },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButtonText: { fontSize: 18 },

  quantityText: { marginHorizontal: 15 },

  disabledButton: { opacity: 0.5 },

  removeButton: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeButtonText: { fontSize: 18, color: '#999' },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },

  totalLabel: { fontSize: 18, fontWeight: 'bold' },

  totalPrice: { fontSize: 20, fontWeight: 'bold', color: '#795548' },

  checkoutButton: {
    backgroundColor: '#795548',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },

  checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default CartScreen;