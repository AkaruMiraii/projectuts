import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';

interface BannerContainerProps {
  image?: ImageSourcePropType;
}

const BannerContainerComponent = ({ image }: BannerContainerProps) => {
  return (
    <View style={styles.bannercontainer}>
      {image && (
        <Image source={image} style={styles.image} resizeMode="cover" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bannercontainer: {
    backgroundColor: '#795548',
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default BannerContainerComponent;
