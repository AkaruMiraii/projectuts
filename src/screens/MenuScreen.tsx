import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BrandComponent from '../components/BrandComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import ProductCardComponent from '../components/ProductCardComponent';
import IconButtonComponent from '../components/IconButtonComponent';
import api, { Product } from '../services/api';

const MenuScreen = () => {
  const navigation = useNavigation<any>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded user ID for demo (in real app, get from auth context)
  const userId = 1;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await api.updateCartItem({
        user_id: userId,
        product_id: productId,
        quantity: 1
      });
      Alert.alert('Success', 'Item added to cart!');
    } catch (err) {
      Alert.alert('Error', 'Failed to add item to cart');
      console.error('Error adding to cart:', err);
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await api.updateCartItem({
        user_id: userId,
        product_id: productId,
        quantity: -1
      });
      Alert.alert('Success', 'Item removed from cart!');
    } catch (err) {
      Alert.alert('Error', 'Failed to remove item from cart');
      console.error('Error removing from cart:', err);
    }
  };

  // Map API image string to require() for local images
  const getImageSource = (imageName: string | null): ImageSourcePropType => {
    if (!imageName) return require('../assets/images/croissant_chocolate-removebg-preview.png');

    const imageMap: { [key: string]: ImageSourcePropType } = {
      'choux_fix-removebg-preview.png': require('../assets/images/choux_fix-removebg-preview.png'),
      'caramel_latte-removebg-preview.png': require('../assets/images/caramel_latte-removebg-preview.png'),
      'croissant_chocolate-removebg-preview.png': require('../assets/images/croissant_chocolate-removebg-preview.png'),
      'macaroon-removebg-preview.png': require('../assets/images/macaroon-removebg-preview.png'),
    };

    return imageMap[imageName] || require('../assets/images/croissant_chocolate-removebg-preview.png');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#795548" />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.fullFlex}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <BrandComponent nama="Patrick" />
              <View style={styles.headerRight}>
                <IconButtonComponent
                  iconName="cart-outline"
                  onPress={() => navigation.navigate('Cart')}
                  style={styles.iconMargin}
                />
                <IconButtonComponent
                  iconName="log-out-outline"
                  onPress={() => navigation.navigate('LoginScreen')}
                />
              </View>
            </View>
            <View style={styles.searchWrapper}>
              <SearchBarComponent />
            </View>
          </View>

          {/* CONTENT SECTION */}
          <View style={styles.contentSection}>
            <Text style={styles.h1}>Our Menu</Text>

            {products.map(item => (
              <View key={item.id} style={styles.productWrapper}>
                <ProductCardComponent
                  image={getImageSource(item.image)}
                  title={item.name}
                  category={item.category}
                  description="" // API doesn't provide description, so leave empty
                  price={`Rp ${item.price.toLocaleString('id-ID')}`}
                />
                <View style={styles.cartButtons}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => handleRemoveFromCart(item.id)}
                  >
                    <Text style={styles.cartButtonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => handleAddToCart(item.id)}
                  >
                    <Text style={styles.cartButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffffaa',
    flex: 1,
    minHeight: '100%',
  },
  header: {
    backgroundColor: '#795548',
    height: 180,
    paddingTop: 35,
    padding: 20,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    gap: 15,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchWrapper: {
    marginTop: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    marginTop: 10,
  },
  contentSection: {
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 40,
  },
  scrollView: {
    flexGrow: 1,
  },
  fullFlex: {
    flex: 1,
  },
  iconMargin: {
    marginRight: 10,
  },
  productWrapper: {
    position: 'relative',
  },
  cartButtons: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    gap: 10,
  },
  cartButton: {
    backgroundColor: '#795548',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffaa',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#795548',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;