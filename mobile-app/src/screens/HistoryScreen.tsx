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
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { theme } from '../theme';
import { StatusBadge, BadgeStatus } from '../components/StatusBadge';
import { FilterChips } from '../components/FilterChips';
import { useI18n } from '../i18n';

type HistoryFilter = 'all' | BadgeStatus;

export interface HistoryItem {
  id: string;
  name: string;
  source: 'authentic' | 'sourceUnclear';
  date: string;
  status: BadgeStatus;
}

const mockHistory: HistoryItem[] = [
  { id: '1', name: 'PureGlow Face Cream', source: 'authentic', date: '13 Jun', status: 'verified' },
  { id: '2', name: 'Chocolate wafers', source: 'sourceUnclear', date: '12 Jun', status: 'verified' },
  { id: '3', name: 'Chocolate wafers', source: 'sourceUnclear', date: '12 Jun', status: 'invalid' },
  { id: '4', name: 'Chocolate wafers', source: 'sourceUnclear', date: '12 Jun', status: 'not-verified' },
  { id: '5', name: 'Chocolate wafers', source: 'sourceUnclear', date: '12 Jun', status: 'invalid' },
  { id: '6', name: 'Chocolate wafers', source: 'sourceUnclear', date: '12 Jun', status: 'verified' },
];

interface HistoryScreenProps {
  onBack: () => void;
  onScanPress: () => void;
  onItemPress?: (item: HistoryItem) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack, onScanPress, onItemPress }) => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>('all');

  const items = mockHistory.filter(
    (item) => activeFilter === 'all' || item.status === activeFilter
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
            <ArrowLeft size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.history.title}</Text>
          <View style={styles.backBtn} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FilterChips
            options={[
              { key: 'all', label: t.history.all },
              { key: 'verified', label: t.status.verified },
              { key: 'invalid', label: t.status.invalid },
              { key: 'not-verified', label: t.status.notVerified },
            ]}
            value={activeFilter}
            onChange={setActiveFilter}
          />

          <View style={styles.list}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => onItemPress?.(item)}
              >
                <View style={styles.cardLeft}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {t.checkMeta[item.source]} · {item.date}
                  </Text>
                </View>
                <View style={styles.cardRight}>
                  <StatusBadge status={item.status} />
                  <ChevronRight size={20} color={theme.colors.textTertiary} />
                </View>
              </TouchableOpacity>
            ))}
            {items.length === 0 && (
              <Text style={styles.emptyText}>{t.history.empty}</Text>
            )}
          </View>
        </ScrollView>

        {/* Primary action */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={onScanPress}>
            <Text style={styles.primaryButtonText}>{t.common.scanAProduct}</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    height: 42,
    marginBottom: theme.spacing.base,
  },
  backBtn: {
    width: 42,
    height: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  list: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.base,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.sm,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
    marginRight: theme.spacing.md,
    gap: 4,
  },
  itemName: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  itemMeta: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textLabel,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingVertical: theme.spacing.xl,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  primaryButton: {
    height: 52,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
});
