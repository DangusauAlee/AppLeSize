import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './types';
import ProfileCompletionScreen from '../features/profile/screens/ProfileCompletionScreen';
import WelcomeScreen from '../features/profile/screens/WelcomeScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileCompletion" component={ProfileCompletionScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStackNavigator;
