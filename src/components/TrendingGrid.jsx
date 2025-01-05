import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import GifItem from './GifItem';
import GifModal from './GifModal';

const TrendingGrid = ({ data = [], fetchMoreData, isLoading }) => {
  const [selectedGif, setSelectedGif] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {data.length === 0 && !isLoading ? (
        <Text style={styles.noDataText}>No GIFs found</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <GifItem item={item} onPress={(gif) => { setSelectedGif(gif); setModalVisible(true); }} />}
          keyExtractor={(item, index) => item.id + '-' + index}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
      )}

      <GifModal selectedGif={selectedGif} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
});

export default TrendingGrid;
