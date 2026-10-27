import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { theme } from '../theme';
import { BottomNav, TabKey } from '../components/BottomNav';
import {
  ReportDetailsBottomSheet,
  ReportDetailsData,
} from '../components/ReportDetailsBottomSheet';

type ReportFilter = 'all' | 'under_review' | 'reviewed';

interface ReportItem {
  id: string;
  reportId: string;
  name: string;
  meta: string;
  status: 'under_review' | 'reviewed';
  reason: string;
  category: string;
  verificationResult: string;
  findingTitle?: string;
  findingDescription?: string;
}

const mockReports: ReportItem[] = [
  {
    id: '1',
    reportId: 'VFY-346D4',
    name: 'PureGlow Face Cream',
    meta: 'Source unclear · 12 Jun',
    status: 'under_review',
    reason: 'Product source is unclear',
    category: 'Cosmetics',
    verificationResult: 'Under review',
    findingTitle: 'Review in progress',
    findingDescription:
      'Our review team will assess the available product information. We’ll update this report when the review is complete.',
  },
  {
    id: '2',
    reportId: 'VFY-346D4',
    name: 'PureGlow Face Cream',
    meta: 'Source unclear · 12 Jun',
    status: 'reviewed',
    reason: 'Product source mismatch',
    category: 'Cosmetics',
    verificationResult: 'Could not be verified',
    findingTitle: 'Source mismatch detected',
    findingDescription:
      'The product’s source does not match NAFDAC and manufacturer records. Authenticity could not be verified.',
  },
  {
    id: '3',
    reportId: 'VFY-346D4',
    name: 'PureGlow Face Cream',
    meta: 'Source unclear · 12 Jun',
    status: 'reviewed',
    reason: 'Product authenticity concern',
    category: 'Cosmetics',
    verificationResult: 'No issues found',
    findingTitle: 'No issues found',
    findingDescription:
      'Our review did not identify any suspicious activity or mismatches in the available product information.',
  },
];

interface ReportsScreenProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  onScanPress: () => void;
  onReportAProductPress: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  activeTab,
  onTabPress,
  onScanPress,
  onReportAProductPress,
}) => {
  const [activeFilter, setActiveFilter] = useState<ReportFilter>('all');
  const [selectedReport, setSelectedReport] = useState<ReportDetailsData | null>(null);

  const filteredReports = mockReports.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

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
            <Text style={styles.title}>My Reports</Text>
            <Text style={styles.subtitle}>Follow the reports you’ve sent to Veryfy.</Text>
          </View>

          {/* Filter Pills */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterPill, activeFilter === 'all' && styles.filterPillActive]}
              activeOpacity={0.7}
              onPress={() => setActiveFilter('all')}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === 'all' && styles.filterTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'under_review' && styles.filterPillActive,
              ]}
              activeOpacity={0.7}
              onPress={() => setActiveFilter('under_review')}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === 'under_review' && styles.filterTextActive,
                ]}
              >
                Under review
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'reviewed' && styles.filterPillActive,
              ]}
              activeOpacity={0.7}
              onPress={() => setActiveFilter('reviewed')}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === 'reviewed' && styles.filterTextActive,
                ]}
              >
                Reviewed
              </Text>
            </TouchableOpacity>
          </View>

          {/* Reports Card List */}
          <View style={styles.listContainer}>
            {filteredReports.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.reportCard}
                activeOpacity={0.7}
                onPress={() => {
                  let imageSource = require('../assets/report-product-1.png');
                  let outcomeType: 'mismatch' | 'no_issues' | 'in_progress' = 'in_progress';

                  if (item.id === '2') {
                    imageSource = require('../assets/report-product-2.png');
                    outcomeType = 'mismatch';
                  } else if (item.id === '3') {
                    imageSource = require('../assets/report-product-3.png');
                    outcomeType = 'no_issues';
                  }

                  setSelectedReport({
                    reportId: item.reportId,
                    productName: item.name,
                    submittedDate: 'Submitted 12 June 2025',
                    status: item.status,
                    outcomeType: outcomeType,
                    reason: item.reason,
                    category: item.category,
                    verificationResult: item.verificationResult,
                    findingTitle: item.findingTitle,
                    findingDescription: item.findingDescription,
                    imageSource: imageSource,
                  });
                }}
              >
                <View style={styles.reportCardLeft}>
                  <Text style={styles.reportItemName}>{item.name}</Text>
                  <Text style={styles.reportItemMeta}>{item.meta}</Text>
                </View>

                <View style={styles.reportCardRight}>
                  {item.status === 'under_review' ? (
                    <View style={styles.badgeUnderReview}>
                      <Text style={styles.badgeUnderReviewText}>⏱ Under review</Text>
                    </View>
                  ) : (
                    <View style={styles.badgeReviewed}>
                      <Text style={styles.badgeReviewedText}>✔ Reviewed</Text>
                    </View>
                  )}
                  <ChevronRight size={18} color={theme.colors.textTertiary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Primary Action Button: Report a Product */}
          <TouchableOpacity
            style={styles.reportButton}
            activeOpacity={0.85}
            onPress={onReportAProductPress}
          >
            <Text style={styles.reportButtonText}>Report a Product</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabPress={onTabPress}
          onScanPress={onScanPress}
        />

        {/* Report Details Bottom Sheet */}
        <ReportDetailsBottomSheet
          visible={selectedReport !== null}
          onClose={() => setSelectedReport(null)}
          data={selectedReport || undefined}
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
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    marginBottom: theme.spacing.lg,
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: theme.spacing.xl,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  filterPillActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#EFF6FF',
  },
  filterText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  filterTextActive: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semiBold,
  },
  listContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  reportCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportCardLeft: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  reportItemName: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  reportItemMeta: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  reportCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeUnderReview: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  badgeUnderReviewText: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: theme.typography.weights.medium,
  },
  badgeReviewed: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
  },
  badgeReviewedText: {
    fontSize: 11,
    color: '#010B4F',
    fontWeight: theme.typography.weights.medium,
  },
  reportButton: {
    height: 52,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  reportButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
});
