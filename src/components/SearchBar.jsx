import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { useThemedStyles } from '../theme/useThemedStyles';


const SearchBar = ({ onSearch, onFocus, onBlur, value }) => {
  const [query, setQuery] = useState(value);
  const commonStyles = useThemedStyles();

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleSubmit = () => {
    onSearch(query);
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, commonStyles.styles.text]}
        placeholder="Search GIPHY"
        value={query}
        onChangeText={setQuery}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderTextColor={commonStyles.placeholderTextColor}
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  buttonContainer: {
    width: 80,
  }
});

export default SearchBar;
