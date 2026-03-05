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
  const isDark = theme === 'dark';
  const iconColor = isDark ? '#C0C0C0' : '#000000';
  const backgroundColor = isDark ? '#000000' : '#F0F0F0';
  const borderColor = isDark ? '#C0C0C0' : '#000000';

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
          backgroundColor,
          borderTopColor: borderColor,
          borderTopWidth: 1,
          height: 70, // Increased height
          paddingBottom: 0,
          paddingTop: 4,
        },
        tabBarItemStyle: {
          height: 70,
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
          lineHeight: 16, // Ensure enough space for text
          marginBottom: 0,
          marginTop: 2,
        },
        tabBarLabel: route.name,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={FeedStackNavigator} options={{ title: 'Feed' }} />
      <Tab.Screen name="Swaps" component={SwapsScreen} options={{ title: 'Swaps' }} />
      <Tab.Screen name="Urgent" component={UrgentScreen} options={{ title: 'Urgent' }} />
      <Tab.Screen name="Shops" component={ShopsScreen} options={{ title: 'Shops' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
