import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { useTheme } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, error, containerClassName = '', className = '', style, ...props }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const silver = '#C0C0C0';
  const black = '#000000';
  const lightSilver = '#F0F0F0';

  const backgroundColor = isDark ? black : lightSilver;
  const textColor = isDark ? silver : black;
  const borderColor = isDark ? silver : black;
  const shadowColor = isDark ? silver : black;
  const labelColor = isDark ? silver : black;
  const placeholderColor = isDark ? '#666666' : '#666666';

  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text style={{ color: labelColor, marginBottom: 4, fontWeight: '500' }}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          {
            backgroundColor,
            borderWidth: 1,
            borderColor: error ? '#ef4444' : borderColor,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            color: textColor,
            shadowColor,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 12,
          },
          style,
        ]}
        placeholderTextColor={placeholderColor}
        className={className}
        {...props}
      />
      {error && (
        <Text style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
