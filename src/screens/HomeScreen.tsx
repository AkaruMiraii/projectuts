import React from 'react';
import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import BrandComponent from '../components/BrandComponent';
import CategoryTabsComponent from '../components/CategoryTabsComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import BannerContainerComponent from '../components/BannerContainerComponent';
import MenuComponent from '../components/MenuComponent';

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const menuData = [
    {
      name: 'Croissant au Chocolat',
      category: 'Croissant',
      rating: 4.8,
      sold: '7.9k',
      price: '83.000',
      liked: false,
      image: '', // kosong = tampil icon default
    },
    {
      name: 'Éclair au Chocolat',
      category: 'Dessert',
      rating: 4.7,
      sold: '2.7k',
      price: '65.000',
      liked: false,
      image: '',
    },
    {
      name: 'Choux à la Crème',
      category: 'Dessert',
      rating: 4.8,
      sold: '3.5k',
      price: '70.000',
      liked: true,
      image: '',
    },
    {
      name: 'Caramel Latte',
      category: 'Drink',
      rating: 4.5,
      sold: '4.2k',
      price: '45.000',
      liked: true,
      image: '',
    },
  ];

  // Filter menu berdasarkan kategori
  const filteredMenu =
    selectedCategory === 'All'
      ? menuData
      : menuData.filter((item) => item.category === selectedCategory);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <BrandComponent nama='Patrick' />
          <SearchBarComponent />
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
          <BannerContainerComponent />
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
    paddingBottom: 150,
  },
});

export default HomeScreen;
