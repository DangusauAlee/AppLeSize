import React from 'react';
import { View, Text } from 'react-native';
import ScreenContainer from '../../../common/components/ScreenContainer';

const CreateDemandScreen = () => {
  return (
    <ScreenContainer>
      <View className="flex-1 justify-center items-center">
        <Text className="text-brand-black dark:text-brand-silver">Create Demand</Text>
      </View>
    </ScreenContainer>
  );
};

export default CreateDemandScreen;
