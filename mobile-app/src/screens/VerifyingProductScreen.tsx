import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { CircleCheck, Circle, ScanLine } from 'lucide-react-native';
import { theme } from '../theme';
import { VeryfyLogo } from '../components/VeryfyLogo';
import { useI18n } from '../i18n';

// Time each step stays active before moving on (mock until the verification API exists).
const STEP_DURATION_MS = 900;

interface VerifyingProductScreenProps {
  onComplete: () => void;
}

export const VerifyingProductScreen: React.FC<VerifyingProductScreenProps> = ({ onComplete }) => {
  const { t } = useI18n();
  const steps = t.verifying.steps;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= steps.length) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setActiveStep((step) => step + 1), STEP_DURATION_MS);
    return () => clearTimeout(timer);
  }, [activeStep, onComplete, steps.length]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Brand */}
        <View style={styles.brandRow}>
          <VeryfyLogo width={21} height={23} />
          <Text style={styles.brandText}>Veryfy</Text>
        </View>

        {/* Pulse rings + status */}
        <View style={styles.center}>
          <View style={styles.ringOuter}>
            <View style={styles.ringMiddle}>
              <View style={styles.ringInner}>
                <ScanLine size={34} color={theme.colors.white} />
              </View>
            </View>
          </View>
          <Text style={styles.eyebrow}>{t.verifying.eyebrow}</Text>
          <Text style={styles.title}>{t.verifying.title}</Text>
          <Text style={styles.subtitle}>{t.verifying.subtitle}</Text>
        </View>

        {/* Progress steps */}
        <View style={styles.steps}>
          {steps.map((label, index) => {
            const done = index < activeStep;
            const active = index === activeStep;
            return (
              <View key={label} style={styles.stepRow}>
                <View style={styles.stepIndicator}>
                  {done ? (
                    <CircleCheck size={24} color={theme.colors.white} fill={theme.colors.primary} />
                  ) : active ? (
                    <ActivityIndicator size="small" color={theme.colors.primaryLight} />
                  ) : (
                    <Circle size={22} color={theme.colors.textSecondary} />
                  )}
                </View>
                <Text style={[styles.stepLabel, !done && !active && styles.stepLabelPending]}>
                  {label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: theme.spacing.xl,
    paddingBottom: 48,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandText: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.white,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringOuter: {
    width: 159,
    height: 159,
    borderRadius: 80,
    borderWidth: 1.7,
    borderColor: '#2F2F2F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  ringMiddle: {
    width: 129,
    height: 129,
    borderRadius: 65,
    borderWidth: 1.7,
    borderColor: '#2F2F2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1.7,
    borderColor: '#555555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 10,
    color: '#AAAAAA',
    marginBottom: 9,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.white,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: '#AAAAAA',
    marginTop: 7,
  },
  steps: {
    borderTopWidth: 1.7,
    borderTopColor: '#333333',
    paddingTop: 17,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.white,
  },
  stepLabelPending: {
    color: theme.colors.textSecondary,
  },
});
