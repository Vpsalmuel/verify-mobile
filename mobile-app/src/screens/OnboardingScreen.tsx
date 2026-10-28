import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n';

interface OnboardingScreenProps {
  onScanPress?: () => void;
}

const { width } = Dimensions.get('window');

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onScanPress }) => {
  const { t } = useI18n();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Top/Center Illustration / Preview */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../assets/onboarding-hero.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t.onboarding.title}</Text>
          <Text style={styles.subtitle}>{t.onboarding.subtitle}</Text>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={onScanPress}
          >
            <Text style={styles.primaryButtonText}>{t.onboarding.cta}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.base,
  },
  illustrationWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    width: width,
    height: '100%',
    maxHeight: 460,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    lineHeight: theme.typography.lineHeights.xl,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.sm,
    marginBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    height: 52,
    width: '100%',
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
});
