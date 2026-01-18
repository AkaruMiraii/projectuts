import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useAuth } from '../contexts/AuthContext';

const BrandComponent = () => {
  const { user } = useAuth();

  return (
    <View style={styles.brand}>
      {/* Avatar Icon or Profile Image */}
      <View style={styles.avatar}>
        {user?.profile_image ? (
          <Image source={{ uri: user.profile_image }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person" size={28} color="#5d4037" />
        )}
      </View>

      {/* Text Halo */}
      <View>
        <Text style={styles.halo}>Hello,</Text>
        <Text style={styles.nama}>{user?.name || 'Guest'}</Text>
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

  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
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
