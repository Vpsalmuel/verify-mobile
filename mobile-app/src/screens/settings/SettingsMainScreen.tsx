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
  Flag,
  Bell,
  HelpCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react-native';
import { theme } from '../../theme';

export type SettingsSubScreen =
  | 'language'
  | 'notifications'
  | 'appearance'
  | 'faqs'
  | 'about'
  | 'terms'
  | 'privacy';

interface SettingsMainScreenProps {
  onNavigateSub: (screen: SettingsSubScreen) => void;
}

export const SettingsMainScreen: React.FC<SettingsMainScreenProps> = ({
  onNavigateSub,
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

          {/* Individual Rounded Cards */}
          <View style={styles.cardsContainer}>
            {/* 1. Language Card */}
            <TouchableOpacity
              style={styles.settingCard}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('language')}
            >
              <View style={styles.cardLeft}>
                <Flag size={20} color={theme.colors.textPrimary} />
                <Text style={styles.cardLabel}>Language</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            {/* 2. Notifications Card */}
            <TouchableOpacity
              style={styles.settingCard}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('notifications')}
            >
              <View style={styles.cardLeft}>
                <Bell size={20} color={theme.colors.textPrimary} />
                <Text style={styles.cardLabel}>Notifications</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            {/* 3. FAQs Card */}
            <TouchableOpacity
              style={styles.settingCard}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('faqs')}
            >
              <View style={styles.cardLeft}>
                <HelpCircle size={20} color={theme.colors.textPrimary} />
                <Text style={styles.cardLabel}>FAQs</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            {/* 4. Terms of Use Card */}
            <TouchableOpacity
              style={styles.settingCard}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('terms')}
            >
              <View style={styles.cardLeft}>
                <FileText size={20} color={theme.colors.textPrimary} />
                <Text style={styles.cardLabel}>Terms of use</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            {/* 5. Privacy Policy Card */}
            <TouchableOpacity
              style={styles.settingCard}
              activeOpacity={0.7}
              onPress={() => onNavigateSub('privacy')}
            >
              <View style={styles.cardLeft}>
                <ShieldCheck size={20} color={theme.colors.textPrimary} />
                <Text style={styles.cardLabel}>Privacy policy</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} />
            </TouchableOpacity>
          </View>

          {/* Subtle Footer Caption */}
          <View style={styles.footerSpacing}>
            <Text style={styles.footerNote}>Veryfy version 1.0 · Made for Nigeria</Text>
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
  cardsContainer: {
    gap: 12,
    marginBottom: 40,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 18,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  cardLabel: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textPrimary,
  },
  footerSpacing: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textLabel,
  },
});
