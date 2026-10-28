import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '../../theme';
import { useI18n } from '../../i18n';

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { t } = useI18n();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.aboutScreen.title}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Mission description paragraph */}
          <Text style={styles.description}>{t.aboutScreen.body}</Text>

          {/* Details Table */}
          <View style={styles.tableCard}>
            <View style={styles.row}>
              <Text style={styles.label}>{t.aboutScreen.version}</Text>
              <Text style={styles.value}>{t.aboutScreen.versionValue}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>{t.aboutScreen.support}</Text>
              <Text style={styles.valueHighlight}>support@veryfy.example</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>{t.aboutScreen.jurisdiction}</Text>
              <Text style={styles.value}>{t.aboutScreen.jurisdictionValue}</Text>
            </View>
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
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.xl,
  },
  tableCard: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.base,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    alignItems: 'center',
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textLabel,
  },
  value: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.medium,
  },
  valueHighlight: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
});
