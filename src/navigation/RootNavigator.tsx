import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStackNavigator from './AuthStackNavigator';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../features/profile/hooks/useProfile';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { user, isLoading: authLoading, resettingPassword } = useAuth();
  const { profile, loading: profileLoading, isProfileComplete } = useProfile();
  const [checking, setChecking] = useState(true);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!user) {
        setChecking(false);
        return;
      }
      if (profile) {
        const complete = await isProfileComplete();
        // Show onboarding if profile incomplete OR welcome not seen
        const needsOnboarding = !complete || !profile.has_seen_welcome;
        setShouldShowOnboarding(needsOnboarding);
      }
      setChecking(false);
    };
    checkOnboarding();
  }, [user, profile]);

  if (authLoading || profileLoading || checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#C0C0C0" />
      </View>
    );
  }

  // Show Auth stack if no user or resetting password
  if (!user || resettingPassword) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
      </Stack.Navigator>
    );
  }

  // Show Onboarding stack if needed
  if (shouldShowOnboarding) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingStackNavigator} />
      </Stack.Navigator>
    );
  }

  // Otherwise show Main app
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
