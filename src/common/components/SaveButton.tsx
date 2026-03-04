import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface SaveButtonProps {
  isSaved: boolean;
  onPress: () => void;
  size?: number;
}

const SaveButton: React.FC<SaveButtonProps> = ({ isSaved, onPress, size = 24 }) => {
  const scale = useSharedValue(1);
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#C0C0C0' : '#000000';

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={isSaved ? 'heart' : 'heart-outline'}
          size={size}
          color={isSaved ? '#FF4444' : iconColor}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SaveButton;
