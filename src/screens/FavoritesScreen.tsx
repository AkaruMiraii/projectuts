import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BrandComponent from '../components/BrandComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import ProductCardComponent from '../components/ProductCardComponent';
import IconButtonComponent from '../components/IconButtonComponent';
import CustomPopup from '../components/CustomPopup';

const FavoritesScreen = () => {
  interface ProductData {
    id: number;
    name: string;
    category: string;
    description: string;
    price: string;
  image: ImageSourcePropType;
}

  const navigation = useNavigation<any>();
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [popupTitle, setPopupTitle] = React.useState('');
  const [popupMessage, setPopupMessage] = React.useState('');
  const [popupType, setPopupType] = React.useState<'error' | 'success' | 'info'>('info');

  const handleCartPress = () => {
    setPopupTitle('Keranjang');
    setPopupMessage('Keranjang diklik');
    setPopupType('info');
    setPopupVisible(true);
  };

  const favoritesData: ProductData[] = [
    {
      id: 1,
      name: 'Choux à la Crème',
      category: 'Dessert',
      description:
        'A delicate choux pastry filled with rich, creamy coffee custard. Light, smooth, and perfectly balanced.',
      price: '70.000',
      image: require('../assets/images/choux_fix-removebg-preview.png'),
    },
    {
      id: 2,
      name: 'Caramel Latte',
      category: 'Drink',
      description:
        'Smooth espresso blended with creamy milk and caramel drizzle. Perfectly balanced sweetness.',
      price: '45.000',
      image: require('../assets/images/caramel_latte-removebg-preview.png'),
    },
    {
      id: 3,
      name: 'Pistachio Croissant',
      category: 'Croissant',
      description:
        'Flaky, buttery layers filled with silky pistachio cream. A perfect balance of nutty aroma.',
      price: '85.000',
      image: require('../assets/images/croissant_chocolate-removebg-preview.png'),
    },
    {
      id: 4,
      name: 'Le Macaron',
      category: 'Dessert',
      description:
        'Delicate french almond cookies with smooth ganache filling. Crispy outside, soft inside.',
      price: '85.000',
      image: require('../assets/images/macaroon-removebg-preview.png'),
    },
  ];

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
                <IconButtonComponent iconName="cart-outline" onPress={handleCartPress} style={styles.iconMargin} />
                <IconButtonComponent iconName="log-out-outline" onPress={() => navigation.navigate('LoginScreen')} />
              </View>
            </View>
            <View style={styles.searchWrapper}>
              <SearchBarComponent />
            </View>
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
});

export default FavoritesScreen;
