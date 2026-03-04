import React from 'react';
import { View, Text } from 'react-native';
import ScreenContainer from '../../../common/components/ScreenContainer';

const SwapsScreen = () => {
  return (
    <ScreenContainer>
      <View className="flex-1 justify-center items-center">
        <Text className="text-brand-black dark:text-brand-silver">Swaps</Text>
      </View>
    </ScreenContainer>
  );
};

export default SwapsScreen;
