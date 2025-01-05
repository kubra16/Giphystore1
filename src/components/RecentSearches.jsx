import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const RecentSearches = ({ searches, onSearch }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={searches}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.searchItem}
                        onPress={() => onSearch(item)}  
                    >
                        <Text style={styles.text}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3} 
                horizontal={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    searchItem: {
        backgroundColor: '#f8f9fa',  
        borderRadius: 15,            
        borderColor: '#d1d5db',     
        borderWidth: 1,             
        padding: 8,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        color: '#000',
    },
});

export default RecentSearches;
