import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { Search, CalendarDays, BadgeCheck } from 'lucide-react-native';
import { theme } from '../theme';
import { FilterChips } from '../components/FilterChips';
import { useI18n } from '../i18n';

type AlertFilter = 'all' | 'recalls' | 'counterfeit' | 'safety';

interface AlertItem {
  id: string;
  date: string;
  brand: string;
  type: Exclude<AlertFilter, 'all'>;
}

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    date: 'Sep 15, 2026',
    brand: 'Peak',
    type: 'recalls',
  },
  {
    id: '2',
    date: 'Sep 15, 2026',
    brand: 'Peak',
    type: 'counterfeit',
  },
  {
    id: '3',
    date: 'Sep 15, 2026',
    brand: 'Peak',
    type: 'safety',
  },
  {
    id: '4',
    date: 'Sep 15, 2026',
    brand: 'Peak',
    type: 'recalls',
  },
];

interface AlertsScreenProps {
  onAlertPress: () => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  onAlertPress,
}) => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<AlertFilter>('all');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const alerts = mockAlerts.filter(
    (alert) =>
      (activeFilter === 'all' || alert.type === activeFilter) &&
      (!q ||
        `${t.alerts.itemTitle} ${t.alerts.itemDescription} ${alert.brand}`.toLowerCase().includes(q))
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
            <Text style={styles.title}>{t.alerts.title}</Text>
            <Text style={styles.subtitle}>{t.alerts.subtitle}</Text>
          </View>

          {/* Search */}
          <View style={styles.searchField}>
            <Search size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder={t.alerts.searchPlaceholder}
              placeholderTextColor="#767676"
              value={query}
              onChangeText={setQuery}
            />
          </View>

          <FilterChips
            options={[
              { key: 'all', label: t.alerts.all },
              { key: 'recalls', label: t.alerts.recalls },
              { key: 'counterfeit', label: t.alerts.counterfeit },
              { key: 'safety', label: t.alerts.safety },
            ]}
            value={activeFilter}
            onChange={setActiveFilter}
          />

          <View style={styles.list}>
            {/* Featured alert */}
            <TouchableOpacity style={styles.heroCard} activeOpacity={0.9} onPress={onAlertPress}>
              <Image
                source={require('../assets/alerts-hero.png')}
                style={styles.heroImage}
                resizeMode="cover"
              />
              {/* Stacked bands approximate the Figma top-to-bottom dark gradient */}
              {[0.15, 0.2, 0.25, 0.3].map((opacity, index) => (
                <View
                  key={opacity}
                  style={[styles.heroScrim, { height: `${80 - index * 15}%`, opacity }]}
                />
              ))}
              <View style={styles.heroText}>
                <Text style={styles.heroTitle}>{t.alerts.featuredTitle}</Text>
                <Text style={styles.heroSubtitle}>{t.alerts.featuredSubtitle}</Text>
              </View>
            </TouchableOpacity>

            {alerts.map((alert) => (
              <TouchableOpacity
                key={alert.id}
                style={styles.alertCard}
                activeOpacity={0.7}
                onPress={onAlertPress}
              >
                <Image
                  source={require('../assets/alert-product-peak.png')}
                  style={styles.thumb}
                  resizeMode="cover"
                />
                <View style={styles.alertText}>
                  <View style={styles.alertCopy}>
                    <Text style={styles.alertTitle} numberOfLines={1}>
                      {t.alerts.itemTitle}
                    </Text>
                    <Text style={styles.alertDescription}>{t.alerts.itemDescription}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <CalendarDays size={16} color={theme.colors.textSecondary} />
                      <Text style={styles.metaText}>{alert.date}</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                      <BadgeCheck size={16} color={theme.colors.textSecondary} />
                      <Text style={styles.metaText}>{alert.brand}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            {alerts.length === 0 && <Text style={styles.emptyText}>{t.alerts.empty}</Text>}
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
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.base,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
  },
  searchField: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.base,
    borderRadius: theme.radius.md,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
  list: {
    gap: theme.spacing.base,
    paddingTop: theme.spacing.xs,
  },
  heroCard: {
    height: 203,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  heroText: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.base,
  },
  heroTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.white,
  },
  heroSubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.white,
    opacity: 0.9,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  thumb: {
    width: 70,
    height: 70,
  },
  alertText: {
    flex: 1,
    gap: theme.spacing.md,
  },
  alertCopy: {
    gap: 4,
  },
  alertTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  alertDescription: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textLabel,
    lineHeight: theme.typography.lineHeights.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: theme.colors.border,
  },
  metaText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  emptyText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingVertical: theme.spacing.xl,
  },
});
