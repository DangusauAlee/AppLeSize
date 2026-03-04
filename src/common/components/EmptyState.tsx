import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, actionLabel, onAction }) => {
  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-xl font-bold text-brand-black dark:text-brand-silver text-center mb-2">{title}</Text>
      {message && <Text className="text-brand-black/70 dark:text-brand-silver/70 text-center mb-6">{message}</Text>}
      {actionLabel && onAction && (
        <Button title={actionLabel} onPress={onAction} variant="primary" />
      )}
    </View>
  );
};

export default EmptyState;
