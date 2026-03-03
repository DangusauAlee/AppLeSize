import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle, Platform, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../theme';

interface ScrollableScreenLayoutProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  centerContent?: boolean;
}

export const ScrollableScreenLayout: React.FC<ScrollableScreenLayoutProps> = ({
  children,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  centerContent = false,
}) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();

  const containerHeight = Platform.OS === 'web' ? windowHeight : undefined;

  return (
    <View style={[styles.root, { height: containerHeight }]}>
      <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            centerContent && styles.centerContent,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        >
          {children}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  gradient: { flex: 1 },
  scrollView: { flex: 1 },
  contentContainer: { flexGrow: 1, paddingHorizontal: spacing.lg },
  centerContent: { justifyContent: 'center' },
});
