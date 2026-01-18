import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BrandComponent from '../components/BrandComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import ProductCardComponent from '../components/ProductCardComponent';
import IconButtonComponent from '../components/IconButtonComponent';
import CustomPopup from '../components/CustomPopup';
import api, { Product } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MenuScreen = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'error' | 'success' | 'info'>('info');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      setPopupTitle('Error');
      setPopupMessage('Silakan login terlebih dahulu');
      setPopupType('error');
      setPopupVisible(true);
      return;
    }

    try {
      await api.updateCartItem({
        user_id: user.id,
        product_id: productId,
        quantity: 1
      });
      setPopupTitle('Berhasil');
      setPopupMessage('Ditambahkan ke keranjang!');
      setPopupType('success');
      setPopupVisible(true);
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setPopupTitle('Error');
      setPopupMessage('Gagal menambahkan ke keranjang');
      setPopupType('error');
      setPopupVisible(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('LoginScreen');
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
              <BrandComponent />
              <View style={styles.headerRight}>
                <IconButtonComponent
                  iconName="cart-outline"
                  onPress={() => navigation.navigate('Cart')}
                  style={styles.iconMargin}
                />
                <IconButtonComponent
                  iconName="log-out-outline"
                  onPress={handleLogout}
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
              <ProductCardComponent
                key={item.id}
                image={getImageSource(item.image)}
                title={item.name}
                category={item.category}
                description=""
                price={`Rp ${item.price.toLocaleString('id-ID')}`}
                onBuyPress={() => handleAddToCart(item.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <CustomPopup
        visible={popupVisible}
        title={popupTitle}
        message={popupMessage}
        type={popupType}
        onClose={() => setPopupVisible(false)}
      />
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