import React from 'react';
import { Animated, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete?: () => void;
  onArchive?: () => void;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onDelete, onArchive }) => {
  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <View className="flex-row">
        {onArchive && (
          <Animated.View style={{ transform: [{ translateX: trans }] }}>
            <View className="bg-blue-500 justify-center items-center w-16 h-full">
              <Ionicons name="archive" size={24} color="white" />
            </View>
          </Animated.View>
        )}
        {onDelete && (
          <Animated.View style={{ transform: [{ translateX: trans }] }}>
            <View className="bg-red-500 justify-center items-center w-16 h-full">
              <Ionicons name="trash" size={24} color="white" />
            </View>
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

export default SwipeableRow;
