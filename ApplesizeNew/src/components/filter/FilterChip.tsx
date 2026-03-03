import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  onRemove?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected = false,
  onPress,
  onRemove,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <Ionicons name={icon} size={16} color={selected ? colors.black : colors.primary} style={styles.icon} />}
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
      {onRemove && selected && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close" size={14} color={colors.black} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    ...typography.caption,
    color: colors.text,
  },
  selectedLabel: {
    color: colors.black,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 6,
  },
});
