import React, { useState, useCallback } from 'react';
import { View, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchGifs } from '../api/giphyApi';
import { setSearchResults } from '../store/gifsSlice';
import { debounce } from 'lodash';
import { useThemedStyles } from '../theme/useThemedStyles';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.gifs.searchResults);

  const commonStyles = useThemedStyles();
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length > 0) {
        const result = await searchGifs(query);
        dispatch(setSearchResults(result.data));
      }
    }, 500),
    [dispatch]
  );

  const handleSearch = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <View style={[styles.container]}>
      <TextInput
        style={[styles.input]}
        placeholder="Search for GIFs"
        value={query}
        onChangeText={handleSearch}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={searchResults}
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
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  gifContainer: {
    padding: 5,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default SearchScreen;
