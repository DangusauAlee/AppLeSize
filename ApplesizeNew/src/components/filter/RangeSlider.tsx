import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, spacing, typography } from '../../theme';

interface RangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onValuesChange: (min: number, max: number) => void;
  step?: number;
  unit?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onValuesChange,
  step = 1,
  unit = 'GH₵',
}) => {
  const [localMin, setLocalMin] = useState(minValue);
  const [localMax, setLocalMax] = useState(maxValue);

  useEffect(() => {
    setLocalMin(minValue);
    setLocalMax(maxValue);
  }, [minValue, maxValue]);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, localMax);
    setLocalMin(newMin);
    onValuesChange(newMin, localMax);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, localMin);
    setLocalMax(newMax);
    onValuesChange(localMin, newMax);
  };

  const handleMinInput = (text: string) => {
    const value = parseFloat(text) || min;
    const clamped = Math.max(min, Math.min(value, localMax));
    setLocalMin(clamped);
    onValuesChange(clamped, localMax);
  };

  const handleMaxInput = (text: string) => {
    const value = parseFloat(text) || max;
    const clamped = Math.min(max, Math.max(value, localMin));
    setLocalMax(clamped);
    onValuesChange(localMin, clamped);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Price Range</Text>
        <Text style={styles.value}>
          {unit} {localMin} - {unit} {localMax}
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.minLabel}>{unit} {min}</Text>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          value={localMin}
          onValueChange={setLocalMin}
          onSlidingComplete={() => onValuesChange(localMin, localMax)}
          step={step}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
        <Text style={styles.maxLabel}>{unit} {max}</Text>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.minLabel}>{unit} {min}</Text>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          value={localMax}
          onValueChange={setLocalMax}
          onSlidingComplete={() => onValuesChange(localMin, localMax)}
          step={step}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
        <Text style={styles.maxLabel}>{unit} {max}</Text>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputPrefix}>{unit}</Text>
          <TextInput
            style={styles.input}
            value={String(localMin)}
            onChangeText={handleMinInput}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.toText}>to</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputPrefix}>{unit}</Text>
          <TextInput
            style={styles.input}
            value={String(localMax)}
            onChangeText={handleMaxInput}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
  },
  value: {
    ...typography.body,
    color: colors.primary,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  minLabel: {
    ...typography.caption,
    width: 50,
    textAlign: 'right',
    marginRight: spacing.xs,
  },
  maxLabel: {
    ...typography.caption,
    width: 50,
    marginLeft: spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
  },
  inputPrefix: {
    ...typography.body,
    color: colors.textSecondary,
    marginRight: 4,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    paddingVertical: spacing.xs,
  },
  toText: {
    ...typography.body,
    marginHorizontal: spacing.sm,
  },
});
