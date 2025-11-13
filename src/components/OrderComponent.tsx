import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

const OrderComponent = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexDirection: 'row', gap: 20 }}
      horizontal={true}
    >
      <View style={styles.orderitem}>
        <View style={styles.orderitemimage}></View>
        <View style={styles.orderitemdescription}></View>
      </View>
      <View style={styles.orderitem}>
        <View style={styles.orderitemimage}></View>
        <View style={styles.orderitemdescription}></View>
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
});

export default OrderComponent;
