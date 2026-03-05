import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types'; // We'll add this type
import OnboardingStackNavigator from './OnboardingStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import { useOnboardingGate } from '../features/profile/hooks/useOnboardingGate';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStackNavigator = () => {
  const { needsOnboarding, loading } = useOnboardingGate();

  if (loading) {
    // Optional: show a loading spinner while checking profile
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {needsOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingStackNavigator} />
      ) : (
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
