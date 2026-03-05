import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../../navigation/types';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import Input from '../../../common/components/Input';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import IconWithHighlight from '../../../common/components/IconWithHighlight';
import { useTheme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../../hooks/useAuth';

type ProfileCompletionNavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'ProfileCompletion'>;

const ProfileCompletionScreen = () => {
  const navigation = useNavigation<ProfileCompletionNavigationProp>();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { profile, updateProfile, loading } = useProfile();

  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [country, setCountry] = useState(profile?.country || '');
  const [state, setState] = useState(profile?.state || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [idNumber, setIdNumber] = useState(profile?.id_number || '');
  const [businessName, setBusinessName] = useState(profile?.business_name || '');
  const [submitting, setSubmitting] = useState(false);

  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const mutedColor = theme === 'dark' ? '#FFFFFF80' : '#00000080';

  const handleSubmit = async () => {
    if (!firstName || !lastName || !phone || !country || !state || !address) {
      showToast('error', 'Error', 'Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone,
        country,
        state,
        address,
        id_number: idNumber || undefined,
        business_name: businessName || undefined,
      });

      showToast('success', 'Profile saved!', 'Welcome to Applesize');
      navigation.navigate('Welcome');
    } catch (error: any) {
      showToast('error', 'Update failed', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer scroll>
      <LoadingOverlay visible={submitting || loading} message="Saving..." />
      <View className="px-6 py-8">
        <View className="items-center mb-8">
          <IconWithHighlight
            icon={<Ionicons name="person-circle" size={48} />}
          />
          <Text style={{ color: textColor, fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>
            Complete Your Profile
          </Text>
          <Text style={{ color: mutedColor, textAlign: 'center', marginTop: 8 }}>
            Please provide your details to continue
          </Text>
        </View>

        <Input
          label="First Name *"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="John"
        />
        <Input
          label="Last Name *"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Doe"
        />
        <Input
          label="Phone Number *"
          value={phone}
          onChangeText={setPhone}
          placeholder="+1234567890"
          keyboardType="phone-pad"
        />
        <Input
          label="Country *"
          value={country}
          onChangeText={setCountry}
          placeholder="Country"
        />
        <Input
          label="State/Region *"
          value={state}
          onChangeText={setState}
          placeholder="State"
        />
        <Input
          label="Address *"
          value={address}
          onChangeText={setAddress}
          placeholder="Street address"
        />

        <View className="mt-4 p-4 bg-black/5 dark:bg-white/5 rounded-lg">
          <Text style={{ color: mutedColor, fontSize: 14, marginBottom: 8 }}>
            The following fields are optional but recommended for full features and to earn your Applesized badge:
          </Text>
        </View>

        <Input
          label="Market ID Number (Optional)"
          value={idNumber}
          onChangeText={setIdNumber}
          placeholder="ID number"
        />
        <Input
          label="Shop/Business Name (Optional)"
          value={businessName}
          onChangeText={setBusinessName}
          placeholder="Your shop name"
        />

        <Button
          title="Continue"
          onPress={handleSubmit}
          loading={submitting}
          className="mt-6"
        />
      </View>
    </ScreenContainer>
  );
};

export default ProfileCompletionScreen;
