import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { SignInScreen } from '../screens/SignIn';
import { SignUpScreen } from '../screens/SignUp';
import { WelcomeScreen } from '../screens/Welcome';
import { HomeScreen } from '../screens/Home';
import { AuthStackParamList, AppStackParamList } from './types';

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const AppNavigatorInner = () => {
  // Temporary flag – in production, fetch from user profile
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { flex: 1 } // 👈 CRITICAL FIX FOR WEB SCROLLING
      }}
      initialRouteName={hasSeenWelcome ? 'Home' : 'Welcome'}
    >
      <AppStack.Screen name="Welcome" component={WelcomeScreen} />
      <AppStack.Screen name="Home" component={HomeScreen} />
    </AppStack.Navigator>
  );
};

export const AppNavigator = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {session ? <AppNavigatorInner /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
