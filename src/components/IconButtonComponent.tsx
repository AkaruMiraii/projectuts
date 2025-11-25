import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface IconButtonProps {
  iconName: string;       // Nama icon (contoh: 'cart-outline', 'notifications-outline')
  onPress: () => void;
  size?: number;          // Default 24
  color?: string;         // Warna icon (Default Putih)
  style?: ViewStyle;      // Style container (untuk ganti warna background tombol)
}

const IconButtonComponent: React.FC<IconButtonProps> = ({ 
  iconName, 
  onPress, 
  size = 24, 
  color = '#FFFFFF', 
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={iconName as any} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4E342E', // Warna default: Coklat Tua (sesuai gambar Cart)
    width: 45,
    height: 45,
    borderRadius: 12,           // Radius sudut
    justifyContent: 'center',
    alignItems: 'center',
    
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default IconButtonComponent;