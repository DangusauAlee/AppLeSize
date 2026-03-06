import React, { useState, useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';
import ProfileCompletionScreen from '../features/profile/screens/ProfileCompletionScreen';
import WelcomeScreen from '../features/profile/screens/WelcomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../features/profile/hooks/useProfile';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator<AppStackParamList>();

const OnboardingFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState<'profile' | 'welcome'>('profile');

  const handleProfileComplete = () => {
    setCurrentStep('welcome');
  };

  return (
    <>
      {currentStep === 'profile' ? (
        <ProfileCompletionScreen onComplete={handleProfileComplete} />
      ) : (
        <WelcomeScreen onComplete={onComplete} />
      )}
    </>
  );
};

const AppStackNavigator = () => {
  const { user } = useAuth();
  const { profile, isProfileLoading } = useProfile();

  const [flowActive, setFlowActive] = useState(false);
  const prevUserIdRef = useRef<string | undefined>(undefined);

  // Reset flowActive when user changes
  useEffect(() => {
    const currentUserId = user?.id;
    if (currentUserId !== prevUserIdRef.current) {
      // User changed – set flowActive based on the new profile's completeness
      if (!isProfileLoading && profile) {
        const needsOnboarding = !profile.first_name || !profile.last_name || !profile.phone ||
                                !profile.country || !profile.state || !profile.address;
        setFlowActive(needsOnboarding);
      } else {
        // Profile not yet loaded – start with false; will update when loaded
        setFlowActive(false);
      }
      prevUserIdRef.current = currentUserId;
    }
  }, [user?.id, profile, isProfileLoading]);

  // After profile loads (for same user), start flow if incomplete and not already active
  useEffect(() => {
    if (!isProfileLoading && profile && user?.id === prevUserIdRef.current) {
      const needsOnboarding = !profile.first_name || !profile.last_name || !profile.phone ||
                              !profile.country || !profile.state || !profile.address;
      if (needsOnboarding && !flowActive) {
        setFlowActive(true);
      }
      // If profile is complete and flowActive is true, we leave it true (user is mid‑flow)
      // No need to set flowActive false here – that would interrupt an ongoing welcome.
    }
  }, [profile, isProfileLoading, flowActive, user?.id]);

  if (!user) return null;
  if (isProfileLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#C0C0C0" />
      </View>
    );
  }

  if (flowActive) {
    return <OnboardingFlow onComplete={() => setFlowActive(false)} />;
  }

  return <BottomTabNavigator />;
};

export default AppStackNavigator;