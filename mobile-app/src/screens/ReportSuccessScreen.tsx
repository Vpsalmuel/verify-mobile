import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n';

interface ReportSuccessScreenProps {
  onDone: () => void;
  onReportAnother: () => void;
}

export const ReportSuccessScreen: React.FC<ReportSuccessScreenProps> = ({
  onDone,
  onReportAnother,
}) => {
  const { t } = useI18n();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Centered Success Card */}
        <View style={styles.content}>
          <View style={styles.successIconWrapper}>
            <CheckCircle2 size={64} color="#22C55E" />
          </View>
          <Text style={styles.title}>{t.reportSuccess.title}</Text>
          <Text style={styles.subtitle}>{t.reportSuccess.subtitle}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.doneBtn}
            activeOpacity={0.85}
            onPress={onDone}
          >
            <Text style={styles.doneBtnText}>{t.common.done}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reportAnotherBtn}
            activeOpacity={0.8}
            onPress={onReportAnother}
          >
            <Text style={styles.reportAnotherBtnText}>{t.common.reportAProduct}</Text>
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
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  successIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    gap: theme.spacing.md,
  },
  doneBtn: {
    height: 52,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtnText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
  reportAnotherBtn: {
    height: 52,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  reportAnotherBtnText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
});
