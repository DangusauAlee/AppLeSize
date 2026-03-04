import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, error, containerClassName = '', className = '', ...props }) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && <Text className="text-brand-black dark:text-brand-silver mb-1 font-medium">{label}</Text>}
      <TextInput
        className={`border rounded-lg px-4 py-3 text-brand-black dark:text-brand-silver border-brand-black dark:border-brand-silver ${error ? 'border-red-500' : ''} ${className}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default Input;
