import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
  icon,
}) => {
  const isDisabled = disabled || loading;

  const getContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={type === 'primary' ? colors.black : colors.primary} />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[
            styles.text,
            type === 'primary' && styles.primaryText,
            type === 'secondary' && styles.secondaryText,
            type === 'outline' && styles.outlineText,
            isDisabled && styles.disabledText,
          ]}>{title}</Text>
        </>
      )}
    </>
  );

  if (type === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={isDisabled} activeOpacity={0.8}>
        <LinearGradient
          colors={isDisabled ? [colors.border, colors.border] : [colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {getContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        type === 'secondary' && styles.secondary,
        type === 'outline' && styles.outline,
        isDisabled && styles.disabled,
      ]}
    >
      {getContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  gradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.black,
  },
  secondaryText: {
    color: colors.primary,
  },
  outlineText: {
    color: colors.text,
  },
  disabledText: {
    color: colors.textSecondary,
  },
});
