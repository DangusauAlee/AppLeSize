import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme';

interface InputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  autoCapitalize = 'none',
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error && styles.errorBorder,
      ]}>
        {icon && <Ionicons name={icon} size={20} color={colors.primary} style={styles.icon} />}
        <TextInput
          style={[
            styles.input,
            Platform.OS === 'web' ? { cursor: 'text' } : {},
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    height: 50,
  },
  focused: {
    borderColor: colors.primary,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
