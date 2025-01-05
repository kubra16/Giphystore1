import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrendingScreen from '../screens/TrendingScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trending" component={TrendingScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
