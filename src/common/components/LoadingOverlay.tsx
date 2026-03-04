import React from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white dark:bg-black p-6 rounded-lg items-center">
          <ActivityIndicator size="large" color="#C0C0C0" />
          {message && <Text className="mt-4 text-brand-black dark:text-brand-silver">{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingOverlay;
