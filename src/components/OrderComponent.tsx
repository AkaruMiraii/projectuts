import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

const OrderComponent = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      horizontal={true}
    >
      <View style={styles.orderitem}>
        <View style={styles.orderitemimage} />
        <View style={styles.orderitemdescription} />
      </View>
      <View style={styles.orderitem}>
        <View style={styles.orderitemimage} />
        <View style={styles.orderitemdescription} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
   orderitem: {
    flexDirection: 'row',
    width: 280,
    height: 100,
  },

  orderitemimage: {
    backgroundColor: '#f0c6ffff',
    height: 100,
    width: 100,
  },

  orderitemdescription: {
    backgroundColor: '#f7e2ffff',
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default OrderComponent;
