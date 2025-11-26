import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface IconButtonProps {
  iconName: string;       
  onPress: () => void;
  size?: number;          
  color?: string;         
  style?: ViewStyle;     
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
    backgroundColor: '#4E342E', 
    height: 45,
    borderRadius: 12,         
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