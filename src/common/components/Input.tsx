import React from 'react';
import { TextInput, View, Text, TextInputProps, Platform } from 'react-native';
import { useTheme } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, error, containerClassName = '', className = '', style, ...props }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const black = '#000000';
  const white = '#FFFFFF';

  const backgroundColor = isDark ? white : black;
  const textColor = isDark ? black : white;
  const borderColor = isDark ? white : black;
  const shadowColor = isDark ? white : black;
  const labelColor = isDark ? white : black;
  const placeholderColor = isDark ? black : white;

  const shadowStyle = Platform.select({
    web: {
      boxShadow: `0 6px 10px ${shadowColor}80`,
    },
    default: {
      shadowColor,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 12,
    },
  });

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
          },
          shadowStyle,
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
