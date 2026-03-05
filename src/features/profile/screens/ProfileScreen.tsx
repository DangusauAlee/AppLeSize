import React from 'react';
import { View, Text } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../../common/components/ScreenContainer';

const ProfileScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: tabBarHeight }}>
        <Text className="text-brand-black dark:text-brand-silver">Profile</Text>
      </View>
    </ScreenContainer>
  );
};

export default ProfileScreen;
