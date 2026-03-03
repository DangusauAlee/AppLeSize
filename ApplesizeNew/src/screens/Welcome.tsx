import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollableScreenLayout } from '../components/ui/ScrollableScreenLayout';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography } from '../theme';

export const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleCompleteProfile = () => {
    // In production, update profile flag and navigate to Home
    navigation.replace('Home');
  };

  return (
    <ScrollableScreenLayout centerContent contentContainerStyle={styles.content}>
      <Ionicons name="happy-outline" size={80} color={colors.primary} style={styles.icon} />
      <Text style={styles.title}>Welcome to Applesize!</Text>
      <Text style={styles.subtitle}>The first Apple marketplace for retailers</Text>

      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <Ionicons name="phone-portrait-outline" size={28} color={colors.primary} style={styles.featureIcon} />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Display your products</Text>
            <Text style={styles.featureDescription}>Showcase your inventory to thousands of buyers</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="search-outline" size={28} color={colors.primary} style={styles.featureIcon} />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Intelligent search</Text>
            <Text style={styles.featureDescription}>Find exactly what you're looking for with smart filters</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="megaphone-outline" size={28} color={colors.primary} style={styles.featureIcon} />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Post demands</Text>
            <Text style={styles.featureDescription}>Tell the community what you need</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="flash-outline" size={28} color={colors.primary} style={styles.featureIcon} />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Urgent sales</Text>
            <Text style={styles.featureDescription}>Cash out quickly when you need</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="chatbubbles-outline" size={28} color={colors.primary} style={styles.featureIcon} />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Connect & grow</Text>
            <Text style={styles.featureDescription}>Network with other retailers</Text>
          </View>
        </View>
      </View>

      <View style={styles.benefits}>
        <Text style={styles.benefitsText}>
          No more searching headaches, no more large media, no more information overload.
        </Text>
      </View>

      <Button
        title="Complete Your Profile"
        onPress={handleCompleteProfile}
        type="secondary" // Changed from primary to secondary to match sign-out button
        style={styles.button}
      />
    </ScrollableScreenLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: spacing.xxl, // Add extra bottom padding for spacing
  },
  icon: { marginBottom: spacing.md },
  title: { ...typography.title, fontSize: 32, textAlign: 'center', marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.secondary, textAlign: 'center', marginBottom: spacing.xl },
  featureList: { width: '100%', marginBottom: spacing.lg },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: { marginRight: spacing.md },
  featureText: { flex: 1 },
  featureTitle: { ...typography.body, fontWeight: '600', color: colors.primary, marginBottom: 2 },
  featureDescription: { ...typography.caption, color: colors.textSecondary },
  benefits: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: spacing.xl,
    width: '100%',
  },
  benefitsText: { ...typography.body, color: colors.text, textAlign: 'center', fontStyle: 'italic' },
  button: {
    width: '100%',
    marginBottom: spacing.md, // Add bottom margin to lift it from the edge
  },
});
