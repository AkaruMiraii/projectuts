import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const SearchBarComponent = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search.."
        placeholderTextColor="#8b6f63"
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="#8b6f63" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    height: 55,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    color: '#6b4c3b',
  },
  iconContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
});

export default SearchBarComponent;
