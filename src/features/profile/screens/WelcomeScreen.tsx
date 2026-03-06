import React from 'react';
import { useWindowDimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useTheme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: Props) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isDark = theme === 'dark';

  const pages = [
    {
      backgroundColor: isDark ? '#000000' : '#ffffff',
      image: (
        <Ionicons
          name="rocket"
          size={width * 0.3}
          color={isDark ? '#ffffff' : '#000000'}
        />
      ),
      title: 'Powerful Tools at Your Fingertips',
      subtitle: 'List products, propose swaps, create shops, and chat with other retailers – all in one place.',
    },
    {
      backgroundColor: isDark ? '#000000' : '#ffffff',
      image: (
        <Ionicons
          name="shield-checkmark"
          size={width * 0.3}
          color={isDark ? '#ffffff' : '#000000'}
        />
      ),
      title: 'Trust & Safety First',
      subtitle: 'Full profiles required for posting and chatting. We are not responsible for listed items – always inspect before purchase.',
    },
    {
      backgroundColor: isDark ? '#000000' : '#ffffff',
      image: (
        <Ionicons
          name="ribbon"
          size={width * 0.3}
          color={isDark ? '#ffffff' : '#000000'}
        />
      ),
      title: 'Earn Your Applesized Badge',
      subtitle: 'Complete your profile, add your Market ID and shop name to unlock the golden badge and build trust.',
    },
  ];

  return (
    <Onboarding
      pages={pages}
      onDone={onComplete}
      onSkip={onComplete}
      showSkip={true}
      showNext={true}
      showDone={true}
      skipLabel="Skip"
      nextLabel="Next"
      bottomBarHighlight={false}
      controlStatusBar={false}
      containerStyles={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
      }}
      imageContainerStyles={{
        paddingBottom: 60, // increased space below the icon
        justifyContent: 'center',
        alignItems: 'center',
      }}
      titleStyles={{
        color: isDark ? '#ffffff' : '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20, // pushes title down from the icon
        paddingHorizontal: 20,
      }}
      subTitleStyles={{
        color: isDark ? '#ffffff80' : '#00000080',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 24,
        marginTop: 12, // space between title and subtitle
        lineHeight: 24,
      }}
    />
  );
};

export default WelcomeScreen;