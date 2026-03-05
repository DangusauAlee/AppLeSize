import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../navigation/types';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import IconWithHighlight from '../../../common/components/IconWithHighlight';
import { useTheme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../hooks/useProfile';

const { width } = Dimensions.get('window');

type WelcomeNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Onboarding'>;

interface Slide {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const slides: Slide[] = [
  {
    id: '1',
    category: 'Features',
    title: 'Powerful Tools at Your Fingertips',
    description: 'List products, propose swaps, create shops, and chat with other retailers – all in one place.',
    icon: 'rocket',
  },
  {
    id: '2',
    category: 'Security',
    title: 'Trust & Safety First',
    description: 'Full profiles required for posting and chatting. We are not responsible for listed items – always inspect before purchase.',
    icon: 'shield-checkmark',
  },
  {
    id: '3',
    category: 'Verification',
    title: 'Earn Your Applesized Badge',
    description: 'Complete your profile, add your Market ID and shop name to unlock the golden badge and gain trust.',
    icon: 'ribbon',
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();
  const { theme } = useTheme();
  const { markWelcomeSeen } = useProfile();
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = React.useRef<FlatList>(null);
  const isDark = theme === 'dark';

  const textColor = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF80' : '#00000080';

  const handleContinue = async () => {
    setLoading(true);
    try {
      await markWelcomeSeen();
      // After updating, the onboarding gate will re-evaluate and switch to Main automatically
      // No manual navigation needed because the AppStack will re-render with new data.
    } catch (error: any) {
      showToast('error', 'Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleContinue();
    }
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={{ width, flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
      <IconWithHighlight
        icon={<Ionicons name={item.icon} size={64} color={isDark ? '#FFFFFF' : '#000000'} />}
      />
      <Text style={{ color: textColor, fontSize: 14, fontWeight: '600', marginTop: 16 }}>
        {item.category}
      </Text>
      <Text style={{ color: textColor, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 8 }}>
        {item.title}
      </Text>
      <Text style={{ color: mutedColor, fontSize: 16, textAlign: 'center', marginTop: 8 }}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                width: index === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: isDark ? '#FFFFFF' : '#000000',
                marginHorizontal: 4,
                opacity: index === currentIndex ? 1 : 0.5,
              }}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleNext}>
          <View
            style={{
              backgroundColor: isDark ? '#FFFFFF' : '#000000',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 25,
            }}
          >
            <Text style={{ color: isDark ? '#000000' : '#FFFFFF', fontWeight: '600' }}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default WelcomeScreen;
