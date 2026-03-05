import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../../navigation/types';
import { MotiView } from 'moti';

import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import Input from '../../../common/components/Input';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import IconWithHighlight from '../../../common/components/IconWithHighlight';
import { useTheme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

import { useProfile } from '../hooks/useProfile';

const { width } = Dimensions.get('window');
const MAX_FORM_WIDTH = Math.min(500, width * 0.9);

type ProfileCompletionNavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'ProfileCompletion'>;

const ProfileCompletionScreen = () => {
  const navigation = useNavigation<ProfileCompletionNavigationProp>();
  const { theme } = useTheme();
  const {
    profile,
    isProfileLoading,
    isUpdating,
    updateProfile,
    isProfileComplete,
  } = useProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [businessName, setBusinessName] = useState('');

  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF80' : '#00000080';

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setPhone(profile.phone || '');
      setCountry(profile.country || '');
      setState(profile.state || '');
      setAddress(profile.address || '');
      setIdNumber(profile.id_number || '');
      setBusinessName(profile.business_name || '');
    }
  }, [profile]);

  useEffect(() => {
    if (isProfileComplete) {
      navigation.navigate('Welcome');
    }
  }, [isProfileComplete, navigation]);

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !phone.trim() ||
        !country.trim() || !state.trim() || !address.trim()) {
      showToast('error', 'Required fields', 'Please fill all mandatory fields');
      return;
    }

    try {
      await updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        country: country.trim(),
        state: state.trim(),
        address: address.trim(),
        id_number: idNumber.trim() || undefined,
        business_name: businessName.trim() || undefined,
      });

      showToast('success', 'Profile Updated', 'Welcome to Applesize!');
      navigation.navigate('Welcome');
    } catch (error: any) {
      showToast('error', 'Failed to save', error.message || 'Please try again');
    }
  };

  return (
    <ScreenContainer scroll>
      <LoadingOverlay visible={isProfileLoading || isUpdating} message={isUpdating ? "Saving..." : "Loading profile..."} />

      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18 }}
        style={{ flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingVertical: 40 }}
      >
        <View style={{ width: MAX_FORM_WIDTH, alignItems: 'center', marginBottom: 40 }}>
          <IconWithHighlight
            icon={<Ionicons name="person-circle" size={64} color={textColor} />}
          />
          <Text style={{ color: textColor, fontSize: 28, fontWeight: '700', marginTop: 20, textAlign: 'center' }}>
            Complete Your Profile
          </Text>
          <Text style={{ color: mutedColor, textAlign: 'center', marginTop: 8, fontSize: 16 }}>
            We need these details to verify you and enable full features
          </Text>
        </View>

        <View style={{ width: MAX_FORM_WIDTH }}>
          <MotiView transition={{ staggerChildren: 90 }}>
            <Input label="First Name *" value={firstName} onChangeText={setFirstName} placeholder="John" />
            <Input label="Last Name *" value={lastName} onChangeText={setLastName} placeholder="Doe" />
            <Input label="Phone Number *" value={phone} onChangeText={setPhone} placeholder="+234 801 234 5678" keyboardType="phone-pad" />
            <Input label="Country *" value={country} onChangeText={setCountry} placeholder="Nigeria" />
            <Input label="State/Region *" value={state} onChangeText={setState} placeholder="Lagos" />
            <Input label="Full Address *" value={address} onChangeText={setAddress} placeholder="123 Apple Street, Ikeja" />
          </MotiView>

          <View style={{ marginTop: 32, padding: 20, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 16, ...isDark && { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
            <Text style={{ color: mutedColor, fontSize: 14 }}>
              Optional — complete these to earn your Applesized badge and build trust:
            </Text>
          </View>

          <Input label="Market ID Number (Optional)" value={idNumber} onChangeText={setIdNumber} placeholder="APPL-XXXXXX" style={{ marginTop: 16 }} />
          <Input label="Shop/Business Name (Optional)" value={businessName} onChangeText={setBusinessName} placeholder="Apple Empire Store" style={{ marginTop: 16 }} />

          <Button
            title="Continue"
            onPress={handleSubmit}
            loading={isUpdating}
            disabled={isUpdating}
            style={{ marginTop: 40 }}
          />
        </View>
      </MotiView>
    </ScreenContainer>
  );
};

export default ProfileCompletionScreen;
