import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeedStackParamList } from './types';
import FeedMainScreen from '../features/feed/screens/FeedMainScreen';
import ProductDetailScreen from '../features/product/screens/ProductDetailScreen';
import DemandDetailScreen from '../features/demand/screens/DemandDetailScreen';
import CreateProductScreen from '../features/product/screens/CreateProductScreen';
import CreateDemandScreen from '../features/demand/screens/CreateDemandScreen';

const Stack = createNativeStackNavigator<FeedStackParamList>();

const FeedStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedMain" component={FeedMainScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="DemandDetail" component={DemandDetailScreen} />
      <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
      <Stack.Screen name="CreateDemand" component={CreateDemandScreen} />
    </Stack.Navigator>
  );
};

export default FeedStackNavigator;
