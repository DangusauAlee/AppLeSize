import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  className = '',
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const baseClasses = 'flex-row items-center justify-center px-4 py-3 rounded-lg';
  const variantClasses = {
    primary: 'bg-brand-black dark:bg-brand-silver',
    secondary: 'bg-brand-silver dark:bg-brand-black',
    outline: 'border border-brand-black dark:border-brand-silver bg-transparent',
  };
  const textClasses = {
    primary: 'text-brand-silver dark:text-brand-black',
    secondary: 'text-brand-black dark:text-brand-silver',
    outline: 'text-brand-black dark:text-brand-silver',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? (isDark ? '#C0C0C0' : '#000000') : (isDark ? '#000000' : '#C0C0C0')} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`font-medium ${textClasses[variant]}`}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
