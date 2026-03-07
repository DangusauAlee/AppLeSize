import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from '../../../theme';
import Button from '../../../common/components/Button';
import type { SearchFilters } from '../types';

const deviceTypes = ['Phone', 'Tablet', 'Watch'];
const models = ['iPhone 12', 'iPhone 13', 'iPhone 14', 'Samsung S21', 'Google Pixel 6'];
const memories = ['64GB', '128GB', '256GB', '512GB'];
const usages = ['New', 'Dubai Used', 'UK Used', 'China Used', 'India Used'];
const conditions = ['DM', 'BM', 'DDM', 'CM', 'Original Screen', 'Small Screen'];

const filterSchema = z.object({
  device_type: z.string().optional(),
  model: z.string().optional(),
  memory: z.string().optional(),
  usage: z.array(z.string()).optional(),
  condition: z.array(z.string()).optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export const FilterModal = ({ visible, onClose, onApply, initialFilters = {} }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mainColor = isDark ? '#FFFFFF' : '#000000';
  const bgColor = isDark ? '#000000' : '#FFFFFF';

  const { control, handleSubmit, reset, watch } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: initialFilters,
  });

  const selectedUsage = watch('usage') || [];
  const selectedCondition = watch('condition') || [];

  const onSubmit = (data: FilterFormData) => {
    onApply(data);
    onClose();
  };

  const handleClear = () => {
    reset({});
    onApply({});
    onClose();
  };

  const pickerStyle = {
    inputIOS: { color: mainColor, paddingVertical: 12, paddingHorizontal: 10 },
    inputAndroid: { color: mainColor, paddingVertical: 8, paddingHorizontal: 10 },
    iconContainer: { top: 12, right: 10 },
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: bgColor }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: mainColor }]}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={26} color={mainColor} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <View style={styles.field}>
              <Text style={[styles.label, { color: mainColor }]}>Device Type</Text>
              <Controller
                control={control}
                name="device_type"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.pickerContainer, { borderColor: mainColor }]}>
                    <RNPickerSelect
                      onValueChange={onChange}
                      value={value}
                      items={deviceTypes.map((t) => ({ label: t, value: t }))}
                      style={pickerStyle}
                      placeholder={{ label: 'Any', value: null }}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: mainColor }]}>Model</Text>
              <Controller
                control={control}
                name="model"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.pickerContainer, { borderColor: mainColor }]}>
                    <RNPickerSelect
                      onValueChange={onChange}
                      value={value}
                      items={models.map((m) => ({ label: m, value: m }))}
                      style={pickerStyle}
                      placeholder={{ label: 'Any', value: null }}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: mainColor }]}>Memory</Text>
              <Controller
                control={control}
                name="memory"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.pickerContainer, { borderColor: mainColor }]}>
                    <RNPickerSelect
                      onValueChange={onChange}
                      value={value}
                      items={memories.map((m) => ({ label: m, value: m }))}
                      style={pickerStyle}
                      placeholder={{ label: 'Any', value: null }}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: mainColor }]}>Usage</Text>
              <Controller
                control={control}
                name="usage"
                render={({ field: { onChange, value = [] } }) => (
                  <View style={styles.chipGroup}>
                    {usages.map((item) => {
                      const isSelected = selectedUsage.includes(item);
                      return (
                        <TouchableOpacity
                          key={item}
                          onPress={() => {
                            const newValue = isSelected
                              ? value.filter((v) => v !== item)
                              : [...value, item];
                            onChange(newValue);
                          }}
                          style={[
                            styles.chip,
                            {
                              borderColor: mainColor,
                              backgroundColor: isSelected ? mainColor : bgColor,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: isSelected ? bgColor : mainColor,
                              fontWeight: '600',
                            }}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: mainColor }]}>Condition</Text>
              <Controller
                control={control}
                name="condition"
                render={({ field: { onChange, value = [] } }) => (
                  <View style={styles.chipGroup}>
                    {conditions.map((item) => {
                      const isSelected = selectedCondition.includes(item);
                      return (
                        <TouchableOpacity
                          key={item}
                          onPress={() => {
                            const newValue = isSelected
                              ? value.filter((v) => v !== item)
                              : [...value, item];
                            onChange(newValue);
                          }}
                          style={[
                            styles.chip,
                            {
                              borderColor: mainColor,
                              backgroundColor: isSelected ? mainColor : bgColor,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: isSelected ? bgColor : mainColor,
                              fontWeight: '600',
                            }}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: mainColor }]}>Price Range (₦)</Text>
              <View style={styles.priceRow}>
                <Controller
                  control={control}
                  name="min_price"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.priceInput, { borderColor: mainColor, color: mainColor }]}
                      placeholder="Min"
                      placeholderTextColor={mainColor}
                      keyboardType="numeric"
                      value={value?.toString() || ''}
                      onChangeText={(text) => onChange(text ? Number(text) : undefined)}
                    />
                  )}
                />
                <Text style={[styles.priceDash, { color: mainColor }]}>–</Text>
                <Controller
                  control={control}
                  name="max_price"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.priceInput, { borderColor: mainColor, color: mainColor }]}
                      placeholder="Max"
                      placeholderTextColor={mainColor}
                      keyboardType="numeric"
                      value={value?.toString() || ''}
                      onChangeText={(text) => onChange(text ? Number(text) : undefined)}
                    />
                  )}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title="Clear All"
              onPress={handleClear}
              variant="outline"
              style={{ flex: 1, borderColor: mainColor }}
            />
            <Button
              title="Apply"
              onPress={handleSubmit(onSubmit)}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)' },
  modalContent: {
    marginTop: 'auto',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 20,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  scroll: { maxHeight: '70%' },
  field: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  pickerContainer: {
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 12,
  },
  chipGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  priceInput: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  priceDash: { fontSize: 20, fontWeight: '700' },
  footer: { flexDirection: 'row', gap: 12, marginTop: 20 },
});
