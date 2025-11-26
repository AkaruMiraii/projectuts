import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';

interface ProductCardProps {
  image: ImageSourcePropType;
  title: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  soldCount: string;
}

const ProductCardComponent = ({ image, title, category, description, price, rating, soldCount }: ProductCardProps) => {
  return (
    <View style={styles.cardContainer}>
      {/* Bagian Kiri: Informasi Teks */}
      <View style={styles.infoContainer}>
        
        {/* Tag Kategori */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{category}</Text>
        </View>

        {/* Judul & Deskripsi */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>

        {/* Rating & Terjual */}
        <View style={styles.ratingContainer}>
          <Text style={styles.starIcon}>★</Text> 
          <Text style={styles.ratingText}>{rating} ({soldCount} sold)</Text>
          <Text style={styles.heartIcon}>♥</Text>
        </View>

        {/* Harga & Tombol Buy */}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{price}</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bagian Kanan: Gambar */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.productImage} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', 
    backgroundColor: '#ffff',
    borderRadius: 20,
    padding: 15,
    margin: 10,
    height: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  infoContainer: {
    flex: 0.65, 
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  imageContainer: {
    flex: 0.35, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 130,
    height: 130,
    transform: [{ translateX: 10 }, { scale: 1.1 }],
  },
  tagContainer: {
    backgroundColor: '#5D4037', 
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#9E9E9E',
    lineHeight: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starIcon: {
    color: '#8D6E63', 
    marginRight: 4,
    fontSize: 14,
  },
  heartIcon: {
    color: '#8D6E63',
    marginLeft: 10,
    fontSize: 14,
  },
  ratingText: {
    fontSize: 11,
    color: '#616161',
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buyButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ProductCardComponent;