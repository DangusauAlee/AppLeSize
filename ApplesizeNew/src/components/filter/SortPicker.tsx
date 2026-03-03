import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { Button } from '../ui/Button';

export type SortOption = {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

interface SortPickerProps {
  selected: string;
  options: SortOption[];
  onSelect: (value: string) => void;
  label?: string;
}

export const SortPicker: React.FC<SortPickerProps> = ({
  selected,
  options,
  onSelect,
  label = 'Sort by',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(o => o.value === selected);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Ionicons name="options-outline" size={20} color={colors.primary} />
        <Text style={styles.buttonText}>
          {label}: {selectedOption?.label || 'Select'}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, selected === item.value && styles.selectedOption]}
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                >
                  {item.icon && (
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={selected === item.value ? colors.black : colors.primary}
                      style={styles.optionIcon}
                    />
                  )}
                  <Text style={[styles.optionText, selected === item.value && styles.selectedOptionText]}>
                    {item.label}
                  </Text>
                  {selected === item.value && (
                    <Ionicons name="checkmark" size={20} color={colors.black} />
                  )}
                </TouchableOpacity>
              )}
            />

            <Button title="Close" onPress={() => setModalVisible(false)} type="secondary" />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    ...typography.body,
    marginHorizontal: spacing.xs,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.heading,
    fontSize: 18,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionIcon: {
    marginRight: spacing.md,
  },
  optionText: {
    ...typography.body,
    flex: 1,
  },
  selectedOptionText: {
    color: colors.black,
    fontWeight: '600',
  },
});
