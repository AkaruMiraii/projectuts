import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';

const categories = ['All', 'Croissant', 'Drinks', 'Dessert'];

const CategoryTabsComponent = ({
  onSelect,
}: {
  onSelect: (cat: string) => void;
}) => {
  const [selected, setSelected] = useState('All');

  const handlePress = (item: string) => {
    setSelected(item);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            style={styles.tabPressable}
          >
            <View
              style={[
                styles.tab,
                selected === item ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selected === item ? styles.activeText : styles.inactiveText,
                ]}
              >
                {item}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  tab: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 16,
  },

  activeTab: {
    backgroundColor: '#5b3a2a',
  },
  inactiveTab: {
    backgroundColor: '#dcd1cb',
  },

  tabText: {
    fontSize: 15,
    fontWeight: '500',
  },

  activeText: {
    color: 'white',
  },

  inactiveText: {
    color: '#5b3a2a',
  },
  tabPressable: {
    marginRight: 10,
  },
});

export default CategoryTabsComponent;
