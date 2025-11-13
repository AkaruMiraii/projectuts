import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BannerContainerComponent = () => {
  return <View style={styles.bannercontainer}></View>;
};

const styles = StyleSheet.create({
  bannercontainer: {
    backgroundColor: '#795548',
    height: 140,
    borderRadius: 10,
  },
});

export default BannerContainerComponent;
