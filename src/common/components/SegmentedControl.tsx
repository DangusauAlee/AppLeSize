import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface SegmentedControlProps {
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onSelect,
  className = '',
}) => {
  return (
    <View className={`flex-row bg-brand-black/10 dark:bg-brand-silver/10 rounded-lg p-1 ${className}`}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelect(index)}
          className={`flex-1 py-2 rounded-md items-center ${
            selectedIndex === index
              ? 'bg-brand-black dark:bg-brand-silver'
              : ''
          }`}
        >
          <Text
            className={`${
              selectedIndex === index
                ? 'text-brand-silver dark:text-brand-black font-medium'
                : 'text-brand-black dark:text-brand-silver'
            }`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SegmentedControl;
