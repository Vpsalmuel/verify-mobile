import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import {
  Globe,
  Bell,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  SunMoon,
  Info,
} from 'lucide-react-native';
import { theme } from '../../theme';
import { BottomNav, TabKey } from '../../components/BottomNav';

export type SettingsSubScreen =
  | 'menu'
  | 'notifications'
  | 'language'
  | 'appearance'
  | 'faqs'
  | 'about';

interface SettingsMainScreenProps {
  onNavigateSub: (screen: SettingsSubScreen) => void;
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  onScanPress: () => void;
}

export const SettingsMainScreen: React.FC<SettingsMainScreenProps> = ({
  onNavigateSub,
  activeTab,
  onTabPress,
  onScanPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your app preferences</Text>
          </View>

          {/* Settings Options List */}
          <View style={styles.menuCard}>
            {/* Language */}
            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('language')}
            >
              <View style={styles.menuLeft}>
                <Globe size={20} color={theme.colors.textPrimary} />
                <Text style={styles.menuLabel}>Language</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Notifications */}
            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('notifications')}
            >
              <View style={styles.menuLeft}>
                <Bell size={20} color={theme.colors.textPrimary} />
                <Text style={styles.menuLabel}>Notifications</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Appearance */}
            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('appearance')}
            >
              <View style={styles.menuLeft}>
                <SunMoon size={20} color={theme.colors.textPrimary} />
                <Text style={styles.menuLabel}>Appearance</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* FAQs */}
            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('faqs')}
            >
              <View style={styles.menuLeft}>
                <HelpCircle size={20} color={theme.colors.textPrimary} />
                <Text style={styles.menuLabel}>FAQs</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* About & Privacy */}
            <TouchableOpacity
              style={styles.menuRow}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('about')}
            >
              <View style={styles.menuLeft}>
                <ShieldCheck size={20} color={theme.colors.textPrimary} />
                <Text style={styles.menuLabel}>About VERYFY & Privacy</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>
          </View>

          {/* Footer branding caption */}
          <Text style={styles.footerNote}>Veryfy version 1.0 · Made for Nigeria</Text>
        </ScrollView>

        <BottomNav
          activeTab={activeTab}
          onTabPress={onTabPress}
          onScanPress={onScanPress}
        />
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
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
  },
  menuCard: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    marginBottom: theme.spacing.xxl,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 18,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  menuLabel: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textLabel,
    marginTop: theme.spacing.base,
  },
});
