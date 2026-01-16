import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native'; 
import Ionicons from '@react-native-vector-icons/ionicons';

interface MenuItemProps {
  name: string;
  category: string;
  price: string;
  liked: boolean;
  image?: ImageSourcePropType;
}

interface MenuComponentProps {
  data: MenuItemProps[];
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  category,
  price,
  liked,
  image,
}) => {
  const hasImage = image !== undefined && image !== null;

  return (
    <View style={styles.card}>
      {/* Gambar atau icon */}
      <View style={styles.imageContainer}>
        {hasImage ? (
          <Image source={image} style={styles.image} resizeMode="contain" />
        ) : (
          <Ionicons name="fast-food-outline" size={50} color="#b0815a" />
        )}
      </View>

      {/* Nama dan kategori */}
      <Text style={styles.name}>{name}</Text>
      <View style={styles.categoryTag}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      {/* Harga dan tombol like */}
      <View style={styles.footer}>
        <Text style={styles.price}>{price}</Text>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={18}
          color={liked ? '#c29d65' : '#c9c9c9'}
        />
      </View>
    </View>
  );
};

const MenuComponent: React.FC<MenuComponentProps> = ({ data }) => {
  return (
    <View style={styles.menuGrid}>
      {data.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 12,
    width: '47%',
    padding: 10,
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 130, 
    marginBottom: 8,
  },
  image: {
    width: '130%',
    height: '130%',
    borderRadius: 12,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: 'bold',
    color: '#2d1b10',
    marginBottom: 2,
  },
  categoryTag: {
    backgroundColor: '#c3a78e',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 11,
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: '600',
    color: '#2d1b10',
  },
});

export default MenuComponent;
