import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { X, Clock, CheckCircle2 } from 'lucide-react-native';
import { theme } from '../theme';

export type ReportStatusType = 'under_review' | 'reviewed';
export type ReviewOutcomeType = 'mismatch' | 'no_issues' | 'in_progress';

export interface ReportDetailsData {
  reportId: string;
  productName: string;
  submittedDate: string;
  status: ReportStatusType;
  outcomeType?: ReviewOutcomeType;
  reason: string;
  category: string;
  verificationResult: string;
  imageSource?: any;
  findingTitle?: string;
  findingDescription?: string;
}

interface ReportDetailsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  data?: ReportDetailsData;
}

const defaultReportData: ReportDetailsData = {
  reportId: 'VFY-346D4',
  productName: 'PureGlow Face Cream',
  submittedDate: 'Submitted 12 June 2025',
  status: 'under_review',
  outcomeType: 'in_progress',
  reason: 'Product source is unclear',
  category: 'Cosmetics',
  verificationResult: 'Under review',
  findingTitle: 'Review in progress',
  findingDescription:
    'Our review team will assess the available product information. We’ll update this report when the review is complete.',
};

export const ReportDetailsBottomSheet: React.FC<ReportDetailsBottomSheetProps> = ({
  visible,
  onClose,
  data = defaultReportData,
}) => {
  const isReviewed = data.status === 'reviewed';
  const isNoIssues = data.outcomeType === 'no_issues';

  // Determine finding card styling
  let cardBg = '#FFFBEB';
  let cardBorder = '#FDE68A';
  let titleColor = '#92400E';
  let defaultTitle = 'Review in progress';
  let defaultDesc =
    'Our review team will assess the available product information. We’ll update this report when the review is complete.';

  if (isReviewed) {
    if (isNoIssues) {
      cardBg = '#F0FDF4';
      cardBorder = '#BBF7D0';
      titleColor = '#166534';
      defaultTitle = 'No issues found';
      defaultDesc =
        'Our review did not identify any suspicious activity or mismatches in the available product information.';
    } else {
      cardBg = '#FEF2F2';
      cardBorder = '#FECACA';
      titleColor = '#991B1B';
      defaultTitle = 'Source mismatch detected';
      defaultDesc =
        'The product’s source does not match NAFDAC and manufacturer records. Authenticity could not be verified.';
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheetContainer}>
          {/* Drag Handle & Close X */}
          <View style={styles.topHandleBar}>
            <View style={styles.dragHandle} />
            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.7}
              onPress={onClose}
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
              {/* Badge Pill on top-left of image */}
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
                    isReviewed
                      ? { color: theme.colors.verifiedText }
                      : { color: theme.colors.notVerifiedBorder },
                  ]}
                >
                  {isReviewed ? 'Reviewed' : 'Under review'}
                </Text>
              </View>

              {/* Product Visual */}
              <Image
                source={data.imageSource || require('../assets/report-product-1.png')}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>

            {/* Product Title Header */}
            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>{data.productName}</Text>
              <Text style={styles.submittedDate}>{data.submittedDate}</Text>
              <Text style={styles.reportIdSub}>
                Report ID: <Text style={styles.reportIdValue}>{data.reportId}</Text>
              </Text>
            </View>

            {/* Finding / Status Box */}
            <View
              style={[
                styles.findingCard,
                { backgroundColor: cardBg, borderColor: cardBorder },
              ]}
            >
              <Text style={[styles.findingTitle, { color: titleColor }]}>
                {data.findingTitle || defaultTitle}
              </Text>
              <Text style={styles.findingDescription}>
                {data.findingDescription || defaultDesc}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Report Summary Details */}
            <View style={styles.summarySection}>
              <Text style={styles.summaryHeading}>Report summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Report reason</Text>
                <Text style={styles.summaryValue}>{data.reason}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Product category</Text>
                <Text style={styles.summaryValue}>{data.category}</Text>
              </View>
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
    paddingTop: 10,
    paddingBottom: 4,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dragHandle: {
    width: 38,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 10,
    padding: 4,
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
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
  },
});
