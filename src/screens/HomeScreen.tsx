import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BrandComponent from '../components/BrandComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import BannerContainerComponent from '../components/BannerContainerComponent';
import MenuComponent from '../components/MenuComponent';
import IconButtonComponent from '../components/IconButtonComponent';
import { ImageSourcePropType } from 'react-native';
import api, { Product } from '../services/api';

interface MenuItem {
  name: string;
  category: string;
  price: string;
  image?: ImageSourcePropType;
}

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products: Product[] = await api.getProducts();

        // Transform data to match frontend expectations
        const transformedData: MenuItem[] = products.map(product => {
          let imageSource: ImageSourcePropType | undefined;
          switch (product.image) {
            case 'croissant_chocolate-removebg-preview.png':
              imageSource = require('../assets/images/croissant_chocolate-removebg-preview.png');
              break;
            case 'eclair_chocolat-removebg-preview.png':
              imageSource = require('../assets/images/eclair_chocolat-removebg-preview.png');
              break;
            case 'choux_fix-removebg-preview.png':
              imageSource = require('../assets/images/choux_fix-removebg-preview.png');
              break;
            case 'caramel_latte-removebg-preview.png':
              imageSource = require('../assets/images/caramel_latte-removebg-preview.png');
              break;
            case 'macaroon-removebg-preview.png':
              imageSource = require('../assets/images/macaroon-removebg-preview.png');
              break;
            default:
              imageSource = undefined;
          }

          return {
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            image: imageSource
          };
        });

        setMenuData(transformedData);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <BrandComponent nama='Patrick' />
            <View style={styles.headerRight}> 
              <IconButtonComponent iconName="cart-outline" onPress={() => navigation.navigate('Cart')} style={styles.iconMargin} />
              <IconButtonComponent iconName="log-out-outline" onPress={() => navigation.navigate('LoginScreen')} />
            </View>
          </View>
          <View style={styles.searchWrapper}>
            <SearchBarComponent />
          </View>
        </View>
        <View style={styles.deals}>
          <Text style={styles.h1}>Special Deals!</Text>
          <BannerContainerComponent />
        </View>
        <View style={styles.popular}>
          <Text style={styles.h1}>Popular</Text>
          <BannerContainerComponent />
        </View>
        <View style={styles.menu}>
          <Text style={styles.h1}>Menu</Text>
          <MenuComponent data={menuData} />
        </View>
        <View style={styles.BannerBrand}>
          <BannerContainerComponent image={require('../assets/images/banner.png')}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  container: {
    backgroundColor: '#ffffffaa',
    flex: 1,
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

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchWrapper: {
    marginTop: 12,
  },

  deals: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },

  popular: {
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },

  menu: {
    padding: 20,
  },

  BannerBrand: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 70,
  },

  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },

  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  iconMargin: {
    marginRight: 10,
  },
});

export default HomeScreen;
