import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';

interface ProductCardProps {
  image: ImageSourcePropType;
  title: string;
  category: string;
  description: string;
  price: string;
  onBuyPress?: () => void;
}

const ProductCardComponent = ({ image, title, category, description, price, onBuyPress }: ProductCardProps) => {
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

        {/* Harga & Tombol Buy */}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{price}</Text>
          {onBuyPress && (
            <TouchableOpacity style={styles.buyButton} onPress={onBuyPress}>
              <Text style={styles.buyButtonText}>Buy now</Text>
            </TouchableOpacity>
          )}
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