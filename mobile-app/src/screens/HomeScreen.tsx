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
import {
  QrCode,
  ArrowRight,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import { theme } from '../theme';
import { StatusBadge, BadgeStatus } from '../components/StatusBadge';
import { BottomNav, TabKey } from '../components/BottomNav';
import {
  ReportDetailsBottomSheet,
  ReportDetailsData,
} from '../components/ReportDetailsBottomSheet';

interface RecentCheckItem {
  id: string;
  name: string;
  source: string;
  date: string;
  status: BadgeStatus;
}

const mockRecentChecks: RecentCheckItem[] = [
  {
    id: '1',
    name: "Mama Bolaji & Daughther'...",
    source: 'Source unclear',
    date: '12 Jun',
    status: 'verified',
  },
  {
    id: '2',
    name: 'PureGlow Face Cream',
    source: 'Source unclear',
    date: '12 Jun',
    status: 'verified',
  },
  {
    id: '3',
    name: 'PureGlow Face Cream',
    source: 'Source unclear',
    date: '12 Jun',
    status: 'not-verified',
  },
  {
    id: '4',
    name: 'PureGlow Face Cream',
    source: 'Source unclear',
    date: '12 Jun',
    status: 'not-verified',
  },
];

interface HomeScreenProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
  onVerifyPress?: () => void;
  onSafetyTipsPress?: () => void;
  onCheckItemPress?: (item: RecentCheckItem) => void;
  onViewAllPress?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  activeTab = 'home',
  onTabPress,
  onVerifyPress,
  onSafetyTipsPress,
  onCheckItemPress,
  onViewAllPress,
}) => {
  const [internalTab, setInternalTab] = useState<TabKey>('home');
  const currentTab = onTabPress ? activeTab : internalTab;
  const handleTabPress = onTabPress || setInternalTab;
  const [selectedReport, setSelectedReport] = useState<ReportDetailsData | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeTitle}>Welcome 👋</Text>
            <Text style={styles.welcomeSubtitle}>
              What are you verifying today?
            </Text>
          </View>

          {/* Blue Hero Action Card: "Verify a product" */}
          <TouchableOpacity
            style={styles.heroCard}
            activeOpacity={0.9}
            onPress={onVerifyPress}
          >
            <View style={styles.heroIconCircle}>
              <QrCode size={28} color={theme.colors.white} />
            </View>

            <View style={styles.heroTextContent}>
              <Text style={styles.heroPretitle}>START A CHECK</Text>
              <Text style={styles.heroTitle}>Verify a product</Text>
              <Text style={styles.heroSubtitle}>
                Scan the code on the packaging or enter it manually
              </Text>
            </View>

            <ArrowRight size={22} color={theme.colors.white} />
          </TouchableOpacity>

          {/* Light Gray Education Notice: "Stay safer when buying products" */}
          <TouchableOpacity
            style={styles.noticeCard}
            activeOpacity={0.8}
            onPress={() => {
              // Quick demo opening the Reviewed report sheet
              setSelectedReport({
                reportId: 'VFY-346D4',
                productName: 'PureGlow Face Cream',
                submittedDate: 'Submitted 12 June 2025',
                status: 'reviewed',
                outcomeType: 'mismatch',
                reason: 'Product source mismatch',
                category: 'Cosmetics',
                verificationResult: 'Could not be verified',
                findingTitle: 'Source mismatch detected',
                findingDescription:
                  'The product’s source does not match NAFDAC and manufacturer records. Authenticity could not be verified.',
                imageSource: require('../assets/report-product-2.png'),
              });
              if (onSafetyTipsPress) onSafetyTipsPress();
            }}
          >
            <View style={styles.noticeIconWrapper}>
              <Info size={22} color={theme.colors.textSecondary} />
            </View>
            <View style={styles.noticeTextContent}>
              <Text style={styles.noticeTitle}>
                Stay safer when buying products
              </Text>
              <Text style={styles.noticeSubtitle}>
                Four practical checks to remember
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textTertiary} />
          </TouchableOpacity>

          {/* Recent Checks Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Checks</Text>
            <TouchableOpacity onPress={onViewAllPress}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {/* Checks List */}
          <View style={styles.checksList}>
            {mockRecentChecks.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.checkCard}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.status === 'not-verified') {
                    // Open "Under review" report details bottom sheet
                    setSelectedReport({
                      reportId: 'VFY-RP-10482',
                      productName: item.name,
                      submittedDate: 'Submitted 12 June 2025',
                      status: 'under_review',
                      reason: 'Product source is unclear',
                      category: 'cosmetics',
                      verificationResult: 'Suspicious',
                    });
                  } else if (onCheckItemPress) {
                    onCheckItemPress(item);
                  }
                }}
              >
                <View style={styles.checkCardLeft}>
                  <Text style={styles.checkItemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.checkItemMeta}>
                    {item.source} · {item.date}
                  </Text>
                </View>

                <View style={styles.checkCardRight}>
                  <StatusBadge status={item.status} />
                  <ChevronRight size={18} color={theme.colors.textTertiary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Persistent Bottom Navigation */}
        <BottomNav
          activeTab={currentTab}
          onTabPress={handleTabPress}
          onScanPress={onVerifyPress || (() => {})}
        />

        {/* Suspicious Product / Report Details Bottom Sheet */}
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
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  welcomeTitle: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.lineHeights.xxl,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.regular,
  },
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  heroIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  heroTextContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  heroPretitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: theme.typography.weights.semiBold,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  heroTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.white,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: theme.typography.sizes.xs,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
  },
  noticeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  noticeIconWrapper: {
    marginRight: theme.spacing.md,
  },
  noticeTextContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  noticeSubtitle: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  viewAllText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  checksList: {
    gap: theme.spacing.md,
  },
  checkCard: {
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
  checkCardLeft: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  checkItemName: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  checkItemMeta: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  checkCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
