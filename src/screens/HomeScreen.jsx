import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import TrendingGrid from '../components/TrendingGrid';
import RecentSearches from '../components/RecentSearches';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { fetchGifs } from '../api/giphyApi';
import { useThemedStyles } from '../theme/useThemedStyles';

const categories = ["Trending", "Stickers", "Emoji", "Reactions", "Artists"];

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('Trending');
    const [gifs, setGifs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const commonStyles = useThemedStyles();

    useEffect(() => {
        loadGifs(selectedCategory);
    }, [selectedCategory]);

    const loadGifs = async (category, search = '') => {
        setIsLoading(true);
        const fetchedGifs = await fetchGifs(category, search, 0, 25);
        setGifs(fetchedGifs);
        setOffset(25);
        setIsLoading(false);
    };

    const fetchMoreData = async () => {
        if (isLoading) return;
        setIsLoading(true);
        const fetchedGifs = await fetchGifs(selectedCategory, searchTerm, offset, 25);
        if (fetchedGifs.length > 0) {
            setGifs(prev => [...prev, ...fetchedGifs]);
            setOffset(prev => prev + fetchedGifs.length);
        }
        setIsLoading(false);
    };

    const handleSearch = async (query) => {
        setSearchTerm(query);
        updateRecentSearches(query);
        setShowRecentSearches(false);
        loadGifs('Search', query);
        setSelectedCategory('Search');
    };

    const updateRecentSearches = (newSearch) => {
        if (!recentSearches.includes(newSearch)) {
            setRecentSearches(prev => [newSearch, ...prev].slice(0, 10));
        }
    };

    const handleFocus = () => {
        setShowRecentSearches(true);
    };

    const handleBlur = () => {
        setShowRecentSearches(false);
    };

    const handleTabClick = (category) => {
        setSelectedCategory(category);
        setShowRecentSearches(false); 
    };

    return (
        <View style={[styles.container , commonStyles.styles.background]}>
            <ThemeSwitcher />
            <SearchBar 
                onSearch={handleSearch} 
                onFocus={handleFocus} 
                onBlur={handleBlur} 
                value={searchTerm}
            />
            <View style={[styles.tabs , commonStyles.styles.background]}>
                {categories.map((category) => (
                    <TouchableOpacity 
                        key={category} 
                        style={[styles.tab, selectedCategory === category && styles.selectedTab]}
                        onPress={() => handleTabClick(category)}
                    >
                        <Text style={[ commonStyles.styles.text]}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {showRecentSearches ? (
                <RecentSearches searches={recentSearches} onSearch={handleSearch} />
            ) : (
                <TrendingGrid data={gifs} fetchMoreData={fetchMoreData} isLoading={isLoading} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#eee',
    },
    tab: {
        padding: 10,
    },
    selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#007AFF',
    },
    tabText: {
        fontSize: 16,
        color: '#000',
    },
});

export default HomeScreen;
