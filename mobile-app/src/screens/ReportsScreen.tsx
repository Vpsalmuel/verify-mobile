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
import { ChevronRight, Clock, CheckCircle2 } from 'lucide-react-native';
import { theme } from '../theme';
import { ReportDetailsBottomSheet } from '../components/ReportDetailsBottomSheet';
import { FilterChips } from '../components/FilterChips';
import { useI18n } from '../i18n';
import { ReportRecord, ReportStatus, formatReportDate, useReports } from '../state/reports';

type ReportFilter = 'all' | ReportStatus;

interface ReportsScreenProps {
  onReportAProductPress: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({ onReportAProductPress }) => {
  const { t } = useI18n();
  const { reports } = useReports();
  const [activeFilter, setActiveFilter] = useState<ReportFilter>('all');
  const [selectedReport, setSelectedReport] = useState<ReportRecord | null>(null);

  const filteredReports = reports.filter(
    (item) => activeFilter === 'all' || item.status === activeFilter
  );

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
            <Text style={styles.title}>{t.reports.title}</Text>
            <Text style={styles.subtitle}>{t.reports.subtitle}</Text>
          </View>

          <View style={styles.filterRow}>
            <FilterChips
              options={[
                { key: 'all', label: t.reports.all },
                { key: 'under_review', label: t.status.underReview },
                { key: 'reviewed', label: t.status.reviewed },
              ]}
              value={activeFilter}
              onChange={setActiveFilter}
            />
          </View>

          {/* Reports Card List */}
          <View style={styles.listContainer}>
            {filteredReports.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.reportCard}
                activeOpacity={0.7}
                onPress={() => setSelectedReport(item)}
              >
                <View style={styles.reportCardLeft}>
                  <Text style={styles.reportItemName} numberOfLines={1}>
                    {item.productName}
                  </Text>
                  <Text style={styles.reportItemMeta} numberOfLines={1}>
                    {t.reportForm.issues[item.issue]} · {formatReportDate(item.submittedAt, 'short')}
                  </Text>
                </View>

                <View style={styles.reportCardRight}>
                  {item.status === 'under_review' ? (
                    <View style={styles.badgeUnderReview}>
                      <Clock size={12} color="#92400E" />
                      <Text style={styles.badgeUnderReviewText}>{t.status.underReview}</Text>
                    </View>
                  ) : (
                    <View style={styles.badgeReviewed}>
                      <CheckCircle2 size={12} color="#010B4F" />
                      <Text style={styles.badgeReviewedText}>{t.status.reviewed}</Text>
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
            <Text style={styles.reportButtonText}>{t.common.reportAProduct}</Text>
          </TouchableOpacity>
        </ScrollView>

        <ReportDetailsBottomSheet
          visible={selectedReport !== null}
          onClose={() => setSelectedReport(null)}
          report={selectedReport}
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
    marginBottom: theme.spacing.xl,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
