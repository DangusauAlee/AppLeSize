import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

import FeedStackNavigator from './FeedStackNavigator';
import SwapsScreen from '../features/swap/screens/SwapsScreen';
import UrgentScreen from '../features/urgent/screens/UrgentScreen';
import ShopsScreen from '../features/shop/screens/ShopsScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#C0C0C0' : '#000000';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help';
          if (route.name === 'Feed') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Swaps') iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          else if (route.name === 'Urgent') iconName = focused ? 'alert-circle' : 'alert-circle-outline';
          else if (route.name === 'Shops') iconName = focused ? 'storefront' : 'storefront-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
        tabBarActiveTintColor: iconColor,
        tabBarInactiveTintColor: iconColor,
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#000' : '#fff',
          borderTopColor: theme === 'dark' ? '#C0C0C0' : '#000',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={FeedStackNavigator} />
      <Tab.Screen name="Swaps" component={SwapsScreen} />
      <Tab.Screen name="Urgent" component={UrgentScreen} />
      <Tab.Screen name="Shops" component={ShopsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
