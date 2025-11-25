import React from 'react';
import { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BrandComponent from '../components/BrandComponent';
import CategoryTabsComponent from '../components/CategoryTabsComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import BannerContainerComponent from '../components/BannerContainerComponent';
import MenuComponent from '../components/MenuComponent';
import IconButtonComponent from '../components/IconButtonComponent';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation<any>();

    const menuData = [
    {
      name: 'Croissant au Chocolat',
      category: 'Croissant',
      rating: 4.8,
      sold: '7.9k',
      price: '83.000',
      liked: false,
      image: require('../assets/images/croissant_chocolate-removebg-preview.png'), // kosong = tampil icon default
    },
    {
      name: 'Éclair au Chocolat',
      category: 'Dessert',
      rating: 4.7,
      sold: '2.7k',
      price: '65.000',
      liked: false,
      image: require('../assets/images/eclair_chocolat-removebg-preview.png'),
    },
    {
      name: 'Choux à la Crème',
      category: 'Dessert',
      rating: 4.8,
      sold: '3.5k',
      price: '70.000',
      liked: true,
      image: require('../assets/images/choux_fix-removebg-preview.png'),
    },
    {
      name: 'Caramel Latte',
      category: 'Drink',
      rating: 4.5,
      sold: '4.2k',
      price: '45.000',
      liked: true,
      image: require('../assets/images/caramel_latte-removebg-preview.png'),
    },
  ];

  
  const filteredMenu =
    selectedCategory === 'All'
      ? menuData
      : menuData.filter((item) => item.category === selectedCategory);

    return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <BrandComponent nama='Patrick' />
            <View style={styles.headerRight}> 
              <IconButtonComponent iconName="cart-outline" onPress={() => Alert.alert('Cart', 'Cart pressed')} style={{ marginRight: 10 }} />
              <IconButtonComponent iconName="log-out-outline" onPress={() => navigation.navigate('LoginScreen')} />
            </View>
          </View>
          <View style={styles.searchWrapper}>
            <SearchBarComponent />
          </View>
        </View>
        <View style={styles.navigation}>
          <CategoryTabsComponent onSelect={(cat) => setSelectedCategory(cat)} />
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

  navigation: {
    backgroundColor: '#ffffffaa',
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
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
});

export default HomeScreen;
