import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = true, rightComponent, onBackPress }) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#C0C0C0' : '#000000';

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-brand-black/10 dark:border-brand-silver/10">
      <View className="w-10">
        {showBack && (
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
      <Text className="text-lg font-semibold text-brand-black dark:text-brand-silver">{title}</Text>
      <View className="w-10 items-end">{rightComponent}</View>
    </View>
  );
};

export default Header;
