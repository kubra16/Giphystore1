import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const GifItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.gifContainer} onPress={() => onPress(item)}>
      <Image source={{ uri: item.images.fixed_height.url }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gifContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default GifItem;
