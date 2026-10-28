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
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '../../theme';

interface TermsPrivacyScreenProps {
  onBack: () => void;
}

export const TermsPrivacyScreen: React.FC<TermsPrivacyScreenProps> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms & Privacy Policy</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionHeading}>Terms of Service</Text>
          <Text style={styles.paragraph}>
            VERYFY is a product authentication and verification tool designed to help consumers,
            retailers, and distributors verify the legitimacy of pharmaceutical and consumer goods
            circulating in Nigeria.
          </Text>

          <Text style={styles.sectionHeading}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            We respect your privacy. When you verify a product or report suspicious packaging, only
            the necessary technical details (such as approximate location if enabled, scan timestamp,
            and product codes) are utilized to identify counterfeit batches with regulatory bodies like
            NAFDAC.
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Jurisdiction & Governance</Text>
            <Text style={styles.infoText}>
              All verification rules follow national consumer protection standards and manufacturer
              cluster protocols.
            </Text>
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
    paddingBottom: theme.spacing.xxl,
  },
  sectionHeading: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  paragraph: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.base,
    marginTop: theme.spacing.lg,
  },
  infoTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
});
