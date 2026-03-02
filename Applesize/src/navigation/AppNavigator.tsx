import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from '@/shared/lib/supabase';
import { SignInScreen } from '@/features/auth/components/SignInScreen';
import { SignUpScreen } from '@/features/auth/components/SignUpScreen';
import { HomeScreen } from '@/features/home/components/HomeScreen';
import { AuthStackParamList, AppStackParamList } from './types';

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const AppNavigatorInner = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={HomeScreen} />
  </AppStack.Navigator>
);

export const AppNavigator = () => {
  const [session, setSession] = useState(null);

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
