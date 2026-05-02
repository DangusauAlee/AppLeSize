import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenContainer from '../../../common/components/ScreenContainer';
import Button from '../../../common/components/Button';
import Input from '../../../common/components/Input';
import LoadingOverlay from '../../../common/components/LoadingOverlay';
import { showToast } from '../../../common/components/Toast';
import { supabase } from '../../../services/supabase';
import { useTheme } from '../../../theme';
import {
  EMAIL_REGEX, NIGERIAN_PHONE_REGEX, USERNAME_REGEX,
  getPasswordStrength, mapAuthError,
} from '../utils/validation';
import type { AuthStackParamList } from '../../../navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

type UsernameStatus = 'idle' | 'checking' | 'available' | 'taken';

export default function SignupScreen() {
  const navigation = useNavigation<Nav>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const usernameTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [firstName, setFirstName]     = useState('');
  const [surname, setSurname]         = useState('');
  const [username, setUsername]       = useState('');
  const [phone, setPhone]             = useState('');
  const [email, setEmail]             = useState('');
  const [idNumber, setIdNumber]       = useState('');
  const [password, setPassword]       = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const textColor  = isDark ? '#FFFFFF' : '#000000';
  const mutedColor = isDark ? '#FFFFFF70' : '#00000070';
  const surfaceColor = isDark ? '#111111' : '#F5F5F5';
  const borderColor  = isDark ? '#FFFFFF20' : '#00000020';
  const greenColor   = '#22C55E';
  const redColor     = '#EF4444';

  // Live username availability check
  const checkUsername = useCallback((value: string) => {
    setUsername(value);
    setErrors((e) => ({ ...e, username: '' }));
    if (!USERNAME_REGEX.test(value)) { setUsernameStatus('idle'); return; }
    setUsernameStatus('checking');
    if (usernameTimer.current) clearTimeout(usernameTimer.current);
    usernameTimer.current = setTimeout(async () => {
      const { data } = await supabase.rpc('check_username_available', { p_username: value });
      setUsernameStatus(data === true ? 'available' : 'taken');
    }, 600);
  }, []);

  const strength = getPasswordStrength(password);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!firstName.trim())  e.firstName = 'First name is required';
    if (!surname.trim())    e.surname   = 'Surname is required';
    if (!username.trim())   e.username  = 'Username is required';
    else if (!USERNAME_REGEX.test(username)) e.username = '3–20 chars, letters, numbers, underscores only';
    else if (usernameStatus === 'taken') e.username = 'Username is already taken';
    if (!phone.trim())      e.phone = 'Phone number is required';
    else if (!NIGERIAN_PHONE_REGEX.test(phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid Nigerian phone number';
    if (!email.trim())      e.email = 'Email is required';
    else if (!EMAIL_REGEX.test(email.trim())) e.email = 'Enter a valid email address';
    if (!idNumber.trim())   e.idNumber = 'ID number is required';
    if (!password)          e.password = 'Password is required';
    else if (strength.score < 2) e.password = 'Password is too weak';
    if (!confirmPassword)   e.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!agreed)            e.agreed = 'You must accept the terms and conditions';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // 1. Create Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({ email: email.trim(), password });
      if (authError) throw authError;

      // 2. Create profile row with all App'lesize fields
      const { error: profileError } = await supabase.rpc('create_user_profile', {
        p_first_name: firstName.trim(),
        p_last_name:  surname.trim(),
        p_username:   username.trim(),
        p_phone:      phone.replace(/[\s-]/g, ''),
        p_id_number:  idNumber.trim(),
      });
      if (profileError) throw profileError;

      showToast('success', 'Account created!', 'Check your email for the verification code.');
      navigation.navigate('Otp', { email: email.trim(), type: 'signup' });
    } catch (e: any) {
      showToast('error', 'Signup failed', mapAuthError(e.message));
    } finally {
      setLoading(false);
    }
  };

  const UsernameIndicator = () => {
    if (usernameStatus === 'idle') return null;
    if (usernameStatus === 'checking') return <ActivityIndicator size="small" color={mutedColor} style={{ position: 'absolute', right: 14, top: 38 }} />;
    return (
      <View style={{ position: 'absolute', right: 14, top: 38, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Ionicons name={usernameStatus === 'available' ? 'checkmark-circle' : 'close-circle'} size={20} color={usernameStatus === 'available' ? greenColor : redColor} />
      </View>
    );
  };

  return (
    <ScreenContainer>
      <LoadingOverlay visible={loading} message="Creating account..." />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingTop: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(0).duration(500)} style={{ marginBottom: 32 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
              <Ionicons name="arrow-back" size={24} color={textColor} />
            </TouchableOpacity>
            <Text style={{ color: textColor, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 }}>Create account</Text>
            <Text style={{ color: mutedColor, fontSize: 14, marginTop: 4 }}>Join App'lesize to start trading</Text>
          </Animated.View>

          {/* Personal info section */}
          <Animated.View entering={FadeInDown.delay(80).duration(500)}>
            <SectionLabel label="Personal Information" textColor={textColor} />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Input label="First Name" value={firstName} onChangeText={setFirstName} placeholder="John" autoCapitalize="words" error={errors.firstName} />
              </View>
              <View style={{ flex: 1 }}>
                <Input label="Surname" value={surname} onChangeText={setSurname} placeholder="Doe" autoCapitalize="words" error={errors.surname} />
              </View>
            </View>
            <View>
              <Input label="Username" value={username} onChangeText={checkUsername} placeholder="@johndoe" autoCapitalize="none" autoCorrect={false} error={errors.username} />
              <UsernameIndicator />
            </View>
            <Input label="Phone Number" value={phone} onChangeText={setPhone} placeholder="08012345678" keyboardType="phone-pad" error={errors.phone} />
            <Input label="Email Address" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
            <Input label="NIN / ID Number" value={idNumber} onChangeText={setIdNumber} placeholder="National ID number" error={errors.idNumber} />
          </Animated.View>

          {/* Security section */}
          <Animated.View entering={FadeInDown.delay(160).duration(500)}>
            <SectionLabel label="Security" textColor={textColor} />
            <View>
              <Input label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry={!showPassword} autoCapitalize="none" error={errors.password} />
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={{ position: 'absolute', right: 14, top: 38 }}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={mutedColor} />
              </TouchableOpacity>
            </View>
            {/* Password strength */}
            {password.length > 0 && (
              <View style={{ marginTop: -8, marginBottom: 12, gap: 6 }}>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <View key={i} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: i < strength.score ? strength.color : borderColor }} />
                  ))}
                  <Text style={{ fontSize: 11, fontWeight: '700', color: strength.color, marginLeft: 6 }}>{strength.label}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                  {[
                    { label: '8+ chars', met: password.length >= 8 },
                    { label: 'Uppercase', met: /[A-Z]/.test(password) },
                    { label: 'Number', met: /[0-9]/.test(password) },
                  ].map((r) => (
                    <View key={r.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                      <Ionicons name={r.met ? 'checkmark-circle' : 'ellipse-outline'} size={12} color={r.met ? greenColor : mutedColor} />
                      <Text style={{ fontSize: 11, color: r.met ? greenColor : mutedColor }}>{r.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <View>
              <Input label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="••••••••" secureTextEntry={!showConfirm} autoCapitalize="none" error={errors.confirmPassword} />
              {confirmPassword.length > 0 && (
                <Ionicons
                  name={password === confirmPassword ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={password === confirmPassword ? greenColor : redColor}
                  style={{ position: 'absolute', right: 14, top: 38 }}
                />
              )}
              {!showConfirm && (
                <TouchableOpacity onPress={() => setShowConfirm((v) => !v)} style={{ position: 'absolute', right: 40, top: 38 }}>
                  <Ionicons name="eye" size={20} color={mutedColor} />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          {/* Terms */}
          <Animated.View entering={FadeInDown.delay(240).duration(500)} style={{ marginBottom: 24 }}>
            <TouchableOpacity
              onPress={() => setAgreed((v) => !v)}
              style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}
            >
              <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: agreed ? textColor : borderColor, backgroundColor: agreed ? textColor : 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 }}>
                {agreed && <Ionicons name="checkmark" size={14} color={isDark ? '#000' : '#fff'} />}
              </View>
              <Text style={{ flex: 1, color: mutedColor, fontSize: 13, lineHeight: 20 }}>
                I agree to the <Text style={{ color: textColor, fontWeight: '600' }}>Terms of Service</Text> and <Text style={{ color: textColor, fontWeight: '600' }}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            {errors.agreed ? <Text style={{ color: redColor, fontSize: 12, marginTop: 4 }}>{errors.agreed}</Text> : null}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <Button title="Create Account" onPress={handleSignup} loading={loading} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
              <Text style={{ color: mutedColor }}>Already have an account?  </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: textColor, fontWeight: '700' }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

function SectionLabel({ label, textColor }: { label: string; textColor: string }) {
  return (
    <Text style={{ color: textColor, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12, marginTop: 8 }}>
      {label}
    </Text>
  );
}
