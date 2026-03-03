import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  label?: string;
  error?: string;
  min?: number;
  max?: number;
}

export const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChange,
  currency = 'GH₵',
  label = 'Price',
  error,
  min = 0,
  max = 1000000,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChangeText = (text: string) => {
    // Remove non-numeric characters except decimal
    const cleaned = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    const formatted = parts[0] + (parts.length > 1 ? '.' + parts[1].slice(0, 2) : '');
    
    setInputValue(formatted);
    
    const numericValue = parseFloat(formatted);
    if (!isNaN(numericValue)) {
      const clamped = Math.min(max, Math.max(min, numericValue));
      onChange(clamped);
    }
  };

  const handleBlur = () => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {
      setInputValue(min.toString());
      onChange(min);
    } else {
      const clamped = Math.min(max, Math.max(min, numericValue));
      setInputValue(clamped.toString());
      onChange(clamped);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <Text style={styles.currency}>{currency}</Text>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={colors.textSecondary}
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
    ...typography.body,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  inputError: {
    borderColor: colors.error,
  },
  currency: {
    ...typography.body,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    paddingVertical: spacing.sm,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
