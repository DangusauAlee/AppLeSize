import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

type Condition = 'new' | 'like-new' | 'good' | 'fair';

interface ConditionSelectorProps {
  value: Condition;
  onChange: (value: Condition) => void;
  label?: string;
}

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  value,
  onChange,
  label = 'Condition',
}) => {
  const conditions: { value: Condition; label: string }[] = [
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.options}>
        {conditions.map((condition) => (
          <TouchableOpacity
            key={condition.value}
            style={[
              styles.option,
              value === condition.value && styles.selectedOption,
            ]}
            onPress={() => onChange(condition.value)}
          >
            <Text
              style={[
                styles.optionText,
                value === condition.value && styles.selectedOptionText,
              ]}
            >
              {condition.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  option: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.xs,
    backgroundColor: colors.surface,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    ...typography.body,
    fontSize: 14,
    color: colors.text,
  },
  selectedOptionText: {
    color: colors.black,
    fontWeight: '600',
  },
});
