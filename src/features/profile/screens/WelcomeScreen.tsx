import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
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

type WelcomeNavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();
  const { theme } = useTheme();
  const { markWelcomeSeen } = useProfile();
  const [loading, setLoading] = useState(false);

  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const mutedColor = theme === 'dark' ? '#FFFFFF80' : '#00000080';

  const handleContinue = async () => {
    setLoading(true);
    try {
      await markWelcomeSeen();
      // After marking seen, navigation will automatically switch to Main stack via RootNavigator
      // because profile is now complete and welcome seen.
    } catch (error: any) {
      showToast('error', 'Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer scroll>
      <LoadingOverlay visible={loading} />
      <View className="px-6 py-8">
        <View className="items-center mb-8">
          <IconWithHighlight
            icon={<Ionicons name="happy" size={48} />}
          />
          <Text style={{ color: textColor, fontSize: 28, fontWeight: 'bold', marginTop: 16 }}>
            Welcome to Applesize!
          </Text>
        </View>

        <View className="mb-6">
          <Text style={{ color: textColor, fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
            Your marketplace for retailers
          </Text>
          <Text style={{ color: mutedColor, fontSize: 16, lineHeight: 24 }}>
            • List products you have and products you're looking for
          </Text>
          <Text style={{ color: mutedColor, fontSize: 16, lineHeight: 24 }}>
            • Propose swaps with other retailers
          </Text>
          <Text style={{ color: mutedColor, fontSize: 16, lineHeight: 24 }}>
            • Create and manage your shop
          </Text>
          <Text style={{ color: mutedColor, fontSize: 16, lineHeight: 24 }}>
            • Chat and build your network
          </Text>
        </View>

        <View className="mb-6 p-4 bg-black/5 dark:bg-white/5 rounded-lg">
          <Text style={{ color: textColor, fontWeight: '600', marginBottom: 4 }}>
            Important Security Note
          </Text>
          <Text style={{ color: mutedColor, fontSize: 14 }}>
            Applesize is not responsible for products listed. Always conduct a physical check before purchasing an item.
          </Text>
        </View>

        <View className="mb-6">
          <Text style={{ color: textColor, fontWeight: '600', marginBottom: 4 }}>
            Full Profile Required
          </Text>
          <Text style={{ color: mutedColor, fontSize: 14 }}>
            Posting, chatting, and other features are only available to users with complete profiles. This helps us maintain a safe and trusted community.
          </Text>
        </View>

        <Button
          title="Start Exploring"
          onPress={handleContinue}
          className="mt-4"
        />
      </View>
    </ScreenContainer>
  );
};

export default WelcomeScreen;
