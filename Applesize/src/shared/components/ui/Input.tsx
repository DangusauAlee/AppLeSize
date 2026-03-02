import React from 'react';
import { TextInput, StyleSheet, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/shared/theme';

interface InputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const Input: React.FC<InputProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize = 'none',
  keyboardType = 'default',
}) => {
  const webCursorStyle = Platform.select({
    web: { cursor: 'text' } as any,
    default: {},
  });

  return (
    <View style={styles.container}>
      {icon && <Ionicons name={icon} size={20} color={colors.primary} style={styles.icon} />}
      <TextInput
        style={[styles.input, webCursorStyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.secondary} // Use secondary instead of silverDark
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 50,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.primary,
    fontSize: 16,
  },
});
