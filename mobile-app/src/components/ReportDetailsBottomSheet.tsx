import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import { X, Clock, CheckCircle2 } from 'lucide-react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n';
import { ReportRecord, formatReportDate } from '../state/reports';

interface ReportDetailsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  report: ReportRecord | null;
}

const outcomeTones = {
  in_progress: { bg: '#FFFBEB', border: '#FDE68A', title: '#92400E' },
  no_issues: { bg: '#F0FDF4', border: '#BBF7D0', title: '#166534' },
  mismatch: { bg: '#FEF2F2', border: '#FECACA', title: '#991B1B' },
};

export const ReportDetailsBottomSheet: React.FC<ReportDetailsBottomSheetProps> = ({
  visible,
  onClose,
  report,
}) => {
  const { t } = useI18n();
  if (!report) return null;

  const isReviewed = report.status === 'reviewed';
  const tone = outcomeTones[report.outcome];
  const outcomeText = {
    in_progress: [t.reports.outcomes.inProgressTitle, t.reports.outcomes.inProgressDescription],
    no_issues: [t.reports.outcomes.noIssuesTitle, t.reports.outcomes.noIssuesDescription],
    mismatch: [t.reports.outcomes.mismatchTitle, t.reports.outcomes.mismatchDescription],
  }[report.outcome];
  const location = [report.storeName, report.address].filter(Boolean).join(' · ');

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheetContainer}>
          {/* Header: drag handle centred, close button on its own row space */}
          <View style={styles.topHandleBar}>
            <View style={styles.dragHandle} />
            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.7}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={t.common.cancel}
              hitSlop={8}
            >
              <X size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Product Image Frame */}
            <View style={styles.imageCard}>
              <View
                style={[
                  styles.imageBadgePill,
                  isReviewed ? styles.reviewedBadge : styles.underReviewBadge,
                ]}
              >
                {isReviewed ? (
                  <CheckCircle2 size={13} color={theme.colors.verifiedText} />
                ) : (
                  <Clock size={13} color={theme.colors.notVerifiedBorder} />
                )}
                <Text
                  style={[
                    styles.imageBadgeText,
                    { color: isReviewed ? theme.colors.verifiedText : theme.colors.notVerifiedBorder },
                  ]}
                >
                  {isReviewed ? t.status.reviewed : t.status.underReview}
                </Text>
              </View>

              <Image
                source={
                  report.photoUri
                    ? { uri: report.photoUri }
                    : require('../assets/product-voltarol.png')
                }
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>

            {/* Product Title Header */}
            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>{report.productName}</Text>
              <Text style={styles.submittedDate}>
                {t.reports.submitted(formatReportDate(report.submittedAt))}
              </Text>
              <Text style={styles.reportIdSub}>
                {t.reports.reportId} <Text style={styles.reportIdValue}>{report.reportId}</Text>
              </Text>
            </View>

            {/* Finding / Status Box */}
            <View style={[styles.findingCard, { backgroundColor: tone.bg, borderColor: tone.border }]}>
              <Text style={[styles.findingTitle, { color: tone.title }]}>{outcomeText[0]}</Text>
              <Text style={styles.findingDescription}>{outcomeText[1]}</Text>
            </View>

            <View style={styles.divider} />

            {/* Report Summary Details */}
            <View style={styles.summarySection}>
              <Text style={styles.summaryHeading}>{t.reports.summary}</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t.reports.reason}</Text>
                <Text style={styles.summaryValue}>{t.reportForm.issues[report.issue]}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{t.reports.category}</Text>
                <Text style={styles.summaryValue}>
                  {report.category ? t.reports.cosmetics : t.reports.notSpecified}
                </Text>
              </View>

              {location ? (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{t.reports.location}</Text>
                  <Text style={styles.summaryValue}>{location}</Text>
                </View>
              ) : null}

              {report.details ? (
                <View style={styles.summaryBlock}>
                  <Text style={styles.summaryLabel}>{t.reports.details}</Text>
                  <Text style={styles.summaryBlockText}>{report.details}</Text>
                </View>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: theme.spacing.lg,
  },
  topHandleBar: {
    height: 52,
    alignItems: 'center',
  },
  dragHandle: {
    marginTop: 8,
    width: 38,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  closeBtn: {
    position: 'absolute',
    right: theme.spacing.base,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 0,
    paddingBottom: theme.spacing.xxl,
  },
  imageCard: {
    height: 200,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.base,
    position: 'relative',
    overflow: 'hidden',
  },
  imageBadgePill: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.full,
  },
  underReviewBadge: {
    backgroundColor: '#FFFBEB',
  },
  reviewedBadge: {
    backgroundColor: '#DCFCE7',
  },
  imageBadgeText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productHeader: {
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  productTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  submittedDate: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  reportIdSub: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  reportIdValue: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.medium,
  },
  findingCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.lg,
  },
  findingTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    marginBottom: 6,
  },
  findingDescription: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  divider: {
    height: 0.5,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  summarySection: {
    marginBottom: theme.spacing.xl,
  },
  summaryHeading: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLabel,
  },
  summaryValue: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: theme.spacing.base,
  },
  summaryBlock: {
    gap: 4,
    marginTop: theme.spacing.sm,
  },
  summaryBlockText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.lineHeights.sm,
  },
});
