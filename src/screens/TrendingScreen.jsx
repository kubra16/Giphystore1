import React, { useEffect } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingGifs } from '../api/giphyApi';
import { setTrendingGifs } from '../store/gifsSlice';

const TrendingScreen = () => {
  const dispatch = useDispatch();
  const trendingGifs = useSelector((state) => state.gifs.trending);

  useEffect(() => {
    const loadTrendingGifs = async () => {
      const gifs = await fetchTrendingGifs();
      dispatch(setTrendingGifs(gifs.data));
    };

    loadTrendingGifs();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={trendingGifs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.gifContainer}>
            <Image source={{ uri: item.images.fixed_height.url }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  gifContainer: {
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default TrendingScreen;
