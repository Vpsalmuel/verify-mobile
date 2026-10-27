import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, FileText, QrCode, Bell, Settings } from 'lucide-react-native';
import { theme } from '../theme';

export type TabKey = 'home' | 'reports' | 'scan' | 'alerts' | 'settings';

interface BottomNavProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  onScanPress: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabPress,
  onScanPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => onTabPress('home')}
      >
        <Home
          size={22}
          color={activeTab === 'home' ? theme.colors.textPrimary : theme.colors.textSecondary}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'home' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Reports Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => onTabPress('reports')}
      >
        <FileText
          size={22}
          color={activeTab === 'reports' ? theme.colors.textPrimary : theme.colors.textSecondary}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'reports' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          Reports
        </Text>
      </TouchableOpacity>

      {/* Center Scan FAB */}
      <View style={styles.fabWrapper}>
        <TouchableOpacity
          style={styles.fabButton}
          activeOpacity={0.85}
          onPress={onScanPress}
        >
          <QrCode size={24} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={[styles.tabLabel, styles.tabLabelInactive, { marginTop: 4 }]}>
          Scan
        </Text>
      </View>

      {/* Alerts Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => onTabPress('alerts')}
      >
        <Bell
          size={22}
          color={activeTab === 'alerts' ? theme.colors.textPrimary : theme.colors.textSecondary}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'alerts' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          Alerts
        </Text>
      </TouchableOpacity>

      {/* Settings Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => onTabPress('settings')}
      >
        <Settings
          size={22}
          color={activeTab === 'settings' ? theme.colors.textPrimary : theme.colors.textSecondary}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'settings' ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 54,
  },
  tabLabel: {
    fontSize: theme.typography.sizes.xs,
  },
  tabLabelActive: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.medium,
  },
  tabLabelInactive: {
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.regular,
  },
  fabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
  },
  fabButton: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.fab,
  },
});
