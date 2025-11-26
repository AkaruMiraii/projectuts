import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const BrandComponent = ({ nama = '' }) => {
  return (
    <View style={styles.brand}>
      {/* Avatar Icon */}
      <View style={styles.avatar}>
        <Ionicons name="person" size={28} color="#5d4037" />
      </View>

      {/* Text Halo */}
      <View>
        <Text style={styles.halo}>Hello,</Text>
        <Text style={styles.nama}>{nama}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  halo: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },

  nama: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BrandComponent;
