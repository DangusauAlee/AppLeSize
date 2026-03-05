import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../../navigation/types';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import IconWithHighlight from '../../../common/components/IconWithHighlight';
import { useTheme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../hooks/useProfile';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

type WelcomeNavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;

interface Slide {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  animation: any; // Lottie animation source (we'll use require)
  backgroundColor: string;
}

const slides: Slide[] = [
  {
    id: '1',
    category: 'Features',
    title: 'Powerful Tools at Your Fingertips',
    description: 'List products, propose swaps, create shops, and chat with other retailers – all in one place.',
    icon: 'rocket',
    animation: require('../../../assets/animations/features.json'), // placeholder
    backgroundColor: '#C0C0C0',
  },
  {
    id: '2',
    category: 'Security',
    title: 'Trust & Safety First',
    description: 'Full profiles required for posting and chatting. We are not responsible for listed items – always inspect before purchase.',
    icon: 'shield-checkmark',
    animation: require('../../../assets/animations/security.json'), // placeholder
    backgroundColor: '#000000',
  },
  {
    id: '3',
    category: 'Verification',
    title: 'Earn Your Applesized Badge',
    description: 'Complete your profile, add your Market ID and shop name to unlock the golden badge and gain trust.',
    icon: 'ribbon',
    animation: require('../../../assets/animations/verification.json'), // placeholder
    backgroundColor: '#C0C0C0',
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();
  const { theme } = useTheme();
  const { markWelcomeSeen } = useProfile();
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const isDark = theme === 'dark';

  const textColor = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF80' : '#00000080';

  const handleContinue = async () => {
    setLoading(true);
    try {
      await markWelcomeSeen();
      // RootNavigator will automatically switch to Main because has_seen_welcome becomes true
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
    <View style={{ width, height, backgroundColor: item.backgroundColor }}>
      <View className="flex-1 justify-center items-center px-8">
        <IconWithHighlight
          icon={<Ionicons name={item.icon} size={64} color={isDark ? '#FFFFFF' : '#000000'} />}
        />
        <View className="mt-6 w-full h-48">
          <LottieView
            source={item.animation}
            autoPlay
            loop
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <Text
          style={{ color: isDark ? '#FFFFFF' : '#000000', fontSize: 14, fontWeight: '600', marginTop: 16 }}
        >
          {item.category}
        </Text>
        <Text
          style={{ color: isDark ? '#FFFFFF' : '#000000', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 8 }}
        >
          {item.title}
        </Text>
        <Text
          style={{ color: mutedColor, fontSize: 16, textAlign: 'center', marginTop: 8, paddingHorizontal: 16 }}
        >
          {item.description}
        </Text>
      </View>
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
