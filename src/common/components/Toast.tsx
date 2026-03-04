import React from 'react';
import Toast from 'react-native-toast-message';
import { useColorScheme } from 'nativewind';
import { View, Text } from 'react-native';

export const showToast = (type: 'success' | 'error' | 'info', text1: string, text2?: string) => {
  Toast.show({ type, text1, text2 });
};

const ToastConfig = {
  success: ({ text1, text2 }: any) => {
    const { colorScheme } = useColorScheme();
    return (
      <View className="bg-green-500 px-4 py-3 rounded-lg mx-4 mt-4">
        <Text className="text-white font-bold">{text1}</Text>
        {text2 && <Text className="text-white">{text2}</Text>}
      </View>
    );
  },
  error: ({ text1, text2 }: any) => {
    const { colorScheme } = useColorScheme();
    return (
      <View className="bg-red-500 px-4 py-3 rounded-lg mx-4 mt-4">
        <Text className="text-white font-bold">{text1}</Text>
        {text2 && <Text className="text-white">{text2}</Text>}
      </View>
    );
  },
  info: ({ text1, text2 }: any) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (
      <View className={`${isDark ? 'bg-brand-silver' : 'bg-brand-black'} px-4 py-3 rounded-lg mx-4 mt-4`}>
        <Text className={`${isDark ? 'text-brand-black' : 'text-brand-silver'} font-bold`}>{text1}</Text>
        {text2 && <Text className={`${isDark ? 'text-brand-black' : 'text-brand-silver'}`}>{text2}</Text>}
      </View>
    );
  },
};

export default ToastConfig;
