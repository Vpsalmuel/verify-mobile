import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  ScrollView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '../../theme';
import { useI18n } from '../../i18n';

interface NotificationsSettingsScreenProps {
  onBack: () => void;
}

export const NotificationsSettingsScreen: React.FC<NotificationsSettingsScreenProps> = ({
  onBack,
}) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const { t } = useI18n();
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const [reportUpdates, setReportUpdates] = useState(true);
  const [verificationReminders, setVerificationReminders] = useState(false);
  const [appUpdates, setAppUpdates] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.notificationsScreen.title}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.subtitle}>{t.notificationsScreen.subtitle}</Text>

          <View style={styles.listContainer}>
            {/* Push notifications */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{t.notificationsScreen.push}</Text>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
                thumbColor={theme.colors.white}
              />
            </View>
            <View style={styles.divider} />

            {/* Product and safety alerts */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{t.notificationsScreen.safetyAlerts}</Text>
              <Switch
                value={safetyAlerts}
                onValueChange={setSafetyAlerts}
                trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
                thumbColor={theme.colors.white}
              />
            </View>
            <View style={styles.divider} />

            {/* Report updates */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{t.notificationsScreen.reportUpdates}</Text>
              <Switch
                value={reportUpdates}
                onValueChange={setReportUpdates}
                trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
                thumbColor={theme.colors.white}
              />
            </View>
            <View style={styles.divider} />

            {/* Verification reminders */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{t.notificationsScreen.reminders}</Text>
              <Switch
                value={verificationReminders}
                onValueChange={setVerificationReminders}
                trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
                thumbColor={theme.colors.white}
              />
            </View>
            <View style={styles.divider} />

            {/* App updates */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{t.notificationsScreen.appUpdates}</Text>
              <Switch
                value={appUpdates}
                onValueChange={setAppUpdates}
                trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
                thumbColor={theme.colors.white}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  listContainer: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.base,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  toggleLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.regular,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
});
