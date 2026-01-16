import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButtonComponent from '../components/IconButtonComponent';

const CartScreen = () => {
  const navigation = useNavigation<any>();

  // Mock data untuk keranjang
  const cartItems = [
    {
      id: 1,
      name: 'Croissant au Chocolat',
      price: 83000,
      quantity: 2,
      image: require('../assets/images/croissant_chocolate-removebg-preview.png'),
    },
    {
      id: 2,
      name: 'Caramel Latte',
      price: 45000,
      quantity: 1,
      image: require('../assets/images/caramel_latte-removebg-preview.png'),
    },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

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
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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