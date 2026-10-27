import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Package,
  Info,
} from 'lucide-react-native';
import { theme } from '../theme';

export type VerificationState = 'verified' | 'not-verified' | 'invalid';

interface VerificationResultScreenProps {
  status: VerificationState;
  productName?: string;
  category?: string;
  uniCode?: string;
  manufacturer?: string;
  dateApproved?: string;
  onBack: () => void;
  onScanAnother: () => void;
  onDone: () => void;
  onReport?: () => void;
  onTryAgain?: () => void;
}

export const VerificationResultScreen: React.FC<VerificationResultScreenProps> = ({
  status = 'verified',
  productName = 'VitaCore Paracetamol',
  category = 'Medicine · 500 mg tablets',
  uniCode = 'VFY-2849-1036',
  manufacturer = 'VitaCore Health Ltd.',
  dateApproved = '2024-01-20',
  onBack,
  onScanAnother,
  onDone,
  onReport,
  onTryAgain,
}) => {
  // Config per state
  const config = {
    verified: {
      badgeBg: theme.colors.verifiedBorder,
      badgeText: theme.colors.verifiedText,
      badgeLabel: 'Verified',
      Icon: CheckCircle2,
      cardBg: theme.colors.verifiedBg,
      cardBorder: theme.colors.verifiedBorder,
      headline: 'The Uni-Code matched.',
      description:
        'The Uni Code matched a registered product, with no suspicious activity detected.',
    },
    'not-verified': {
      badgeBg: theme.colors.notVerifiedBorder,
      badgeText: theme.colors.white,
      badgeLabel: 'Not verified',
      Icon: AlertCircle,
      cardBg: theme.colors.notVerifiedBg,
      cardBorder: theme.colors.notVerifiedBorder,
      headline: 'We couldn’t confirm this code.',
      description:
        'Uni Code not recognised or verification incomplete. This doesn’t mean the product is counterfeit.',
    },
    invalid: {
      badgeBg: theme.colors.invalidBorder,
      badgeText: theme.colors.white,
      badgeLabel: 'Invalid',
      Icon: XCircle,
      cardBg: theme.colors.invalidBg,
      cardBorder: theme.colors.invalidBorder,
      headline: 'This code requires caution.',
      description:
        'The verification information associated with this product is invalid or indicates a counterfeit product.',
    },
  }[status];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Navigation Header */}
        <View style={styles.navHeader}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={onBack}
          >
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Product Verification</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Product Image Placeholder / Container */}
          <View style={styles.imageCard}>
            <Image
              source={require('../assets/onboarding-hero.png')}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>

          {/* Product Header Row */}
          <View style={styles.productTitleRow}>
            <View style={styles.packageIconTile}>
              <Package size={20} color={theme.colors.textPrimary} />
            </View>
            <View style={styles.productNameStack}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.productCategory}>{category}</Text>
            </View>
          </View>

          {/* Status Result Card */}
          <View
            style={[
              styles.resultCard,
              {
                backgroundColor: config.cardBg,
                borderColor: config.cardBorder,
              },
            ]}
          >
            <View
              style={[
                styles.statusPill,
                { backgroundColor: config.badgeBg },
              ]}
            >
              <config.Icon size={14} color={config.badgeText} />
              <Text style={[styles.statusPillText, { color: config.badgeText }]}>
                {config.badgeLabel}
              </Text>
            </View>

            <Text style={styles.resultHeadline}>{config.headline}</Text>
            <Text style={styles.resultDescription}>{config.description}</Text>
          </View>

          {/* Body Section Dependent on status */}
          {status === 'verified' && (
            <View style={styles.detailsSection}>
              <Text style={styles.sectionHeading}>Product details</Text>
              <View style={styles.metadataCard}>
                <View style={styles.metadataRow}>
                  <Text style={styles.metaLabel}>Uni-code</Text>
                  <Text style={styles.metaValue}>{uniCode}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.metadataRow}>
                  <Text style={styles.metaLabel}>Manufacturer</Text>
                  <Text style={styles.metaValue}>{manufacturer}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.metadataRow}>
                  <Text style={styles.metaLabel}>Date Approved</Text>
                  <Text style={styles.metaValue}>{dateApproved}</Text>
                </View>
              </View>
            </View>
          )}

          {status === 'not-verified' && (
            <View style={styles.detailsSection}>
              <Text style={styles.sectionHeading}>What to do next</Text>
              <View style={styles.guidanceList}>
                <View style={styles.guidanceItem}>
                  <Info size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.guidanceText}>
                    Check every printed letter and number
                  </Text>
                </View>
                <View style={styles.guidanceItem}>
                  <Info size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.guidanceText}>
                    Try scanning or entering the code again
                  </Text>
                </View>
              </View>
            </View>
          )}

          {status === 'invalid' && (
            <View style={styles.noticeBox}>
              <Info size={18} color={theme.colors.textSecondary} style={{ marginTop: 2 }} />
              <Text style={styles.noticeBoxText}>
                Digital verification doesn’t confirm physical authenticity. Check HiddenMark and match its code with the printed Uni Code.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View style={styles.actionFooter}>
          {status === 'verified' && (
            <>
              <TouchableOpacity
                style={styles.primaryBtn}
                activeOpacity={0.85}
                onPress={onScanAnother}
              >
                <Text style={styles.primaryBtnText}>Scan another product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryBtn}
                activeOpacity={0.8}
                onPress={onDone}
              >
                <Text style={styles.secondaryBtnText}>Done</Text>
              </TouchableOpacity>
            </>
          )}

          {status === 'not-verified' && (
            <>
              <TouchableOpacity
                style={styles.primaryBtn}
                activeOpacity={0.85}
                onPress={onTryAgain || onScanAnother}
              >
                <Text style={styles.primaryBtnText}>Try again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryBtn}
                activeOpacity={0.8}
                onPress={onDone}
              >
                <Text style={styles.secondaryBtnText}>Done</Text>
              </TouchableOpacity>
            </>
          )}

          {status === 'invalid' && (
            <>
              <TouchableOpacity
                style={styles.primaryBtn}
                activeOpacity={0.85}
                onPress={onReport}
              >
                <Text style={styles.primaryBtnText}>Report this product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryBtn}
                activeOpacity={0.8}
                onPress={onDone}
              >
                <Text style={styles.secondaryBtnText}>Done</Text>
              </TouchableOpacity>
            </>
          )}
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
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  navTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  imageCard: {
    height: 180,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.base,
    overflow: 'hidden',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  productTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
    gap: theme.spacing.md,
  },
  packageIconTile: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productNameStack: {
    flex: 1,
  },
  productName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  resultCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.lg,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.full,
    gap: 6,
    marginBottom: theme.spacing.md,
  },
  statusPillText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
  },
  resultHeadline: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  resultDescription: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  detailsSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeading: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  metadataCard: {
    borderRadius: theme.radius.md,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
  },
  metaLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLabel,
  },
  metaValue: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  divider: {
    height: 0.5,
    backgroundColor: theme.colors.border,
  },
  guidanceList: {
    gap: theme.spacing.md,
  },
  guidanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  guidanceText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
  },
  noticeBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.base,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  noticeBoxText: {
    flex: 1,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  actionFooter: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.base,
    gap: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  primaryBtn: {
    height: 52,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
  secondaryBtn: {
    height: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
});
