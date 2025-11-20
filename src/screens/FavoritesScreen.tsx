import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

// 1. Pastikan path import ini benar sesuai struktur folder Anda
import BrandComponent from '../components/BrandComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import ProductCardComponent from '../components/ProductCardComponent';

const FavoritesScreen = () => {
  // Definisi Interface untuk data agar Type Safe (Opsional tapi disarankan di TSX)
  interface ProductData {
    id: number;
    name: string;
    category: string;
    description: string;
    price: string;
    rating: number;
    soldCount: string;
    image: ImageSourcePropType;
  }

  const favoritesData: ProductData[] = [
    {
      id: 1,
      name: 'Choux à la Crème',
      category: 'Dessert',
      description:
        'A delicate choux pastry filled with rich, creamy coffee custard. Light, smooth, and perfectly balanced.',
      price: '70.000',
      rating: 4.8,
      soldCount: '3.5k sold',
      image: require('../assets/choux_fix-removebg-preview.png'),
    },
    {
      id: 2,
      name: 'Caramel Latte',
      category: 'Drink',
      description:
        'Smooth espresso blended with creamy milk and caramel drizzle. Perfectly balanced sweetness.',
      price: '45.000',
      rating: 4.5,
      soldCount: '4.2k sold',
      image: require('../assets/caramel_latte-removebg-preview.png'),
    },
    {
      id: 3,
      name: 'Pistachio Croissant',
      category: 'Croissant',
      description:
        'Flaky, buttery layers filled with silky pistachio cream. A perfect balance of nutty aroma.',
      price: '85.000',
      rating: 4.9,
      soldCount: '1.1k sold',
      image: require('../assets/croissant_chocolate-removebg-preview.png'),
    },
    {
      id: 4,
      name: 'Le Macaron',
      category: 'Dessert',
      description:
        'Delicate french almond cookies with smooth ganache filling. Crispy outside, soft inside.',
      price: '85.000',
      rating: 4.9,
      soldCount: '3.1k sold',
      image: require('../assets/eclair_chocolat-removebg-preview.png'),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }} // Agar background full meskipun konten sedikit
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <BrandComponent nama="Patrick" />
            <SearchBarComponent />
          </View>

          {/* CONTENT SECTION */}
          <View style={styles.contentSection}>
            <Text style={styles.h1}>Here’s Your Favourite Picks!</Text>

            {favoritesData.map(item => (
              <ProductCardComponent
                key={item.id}
                image={item.image}
                title={item.name}
                category={item.category}
                description={item.description}
                price={item.price}
                rating={item.rating}
                soldCount={item.soldCount}
              />
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
});

export default FavoritesScreen;
