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
import { ArrowLeft, Package, Info } from 'lucide-react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n';

interface AlertDetailsScreenProps {
  onBack: () => void;
  brandName?: string;
}

export const AlertDetailsScreen: React.FC<AlertDetailsScreenProps> = ({
  onBack,
  brandName = 'VitaCore',
}) => {
  const { t } = useI18n();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.alertDetails.title}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner Carousel / Image */}
          <View style={styles.carouselContainer}>
            <Image
              source={require('../assets/alerts-hero.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            {/* Carousel Dot Indicators */}
            <View style={styles.dotsRow}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>

          {/* Brand Row Tile */}
          <View style={styles.brandRow}>
            <View style={styles.brandIconTile}>
              <Package size={22} color={theme.colors.textPrimary} />
            </View>
            <View style={styles.brandTextStack}>
              <Text style={styles.brandName}>{brandName}</Text>
              <Text style={styles.brandCategory}>{t.alertDetails.category}</Text>
            </View>
          </View>

          {/* Section: What you need to know */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{t.alertDetails.whatYouNeedToKnow}</Text>
            <Text style={styles.sectionBody}>{t.alertDetails.description}</Text>
          </View>

          {/* Section: What to do next */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{t.alertDetails.whatToDoNext}</Text>

            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>01</Text>
                <Text style={styles.stepText}>{t.alertDetails.steps[0]}</Text>
              </View>

              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>02</Text>
                <Text style={styles.stepText}>{t.alertDetails.steps[1]}</Text>
              </View>

              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>03</Text>
                <Text style={styles.stepText}>{t.alertDetails.steps[2]}</Text>
              </View>
            </View>
          </View>

          {/* Disclaimer / Notice Box */}
          <View style={styles.noticeBox}>
            <Info size={20} color={theme.colors.textSecondary} style={{ marginTop: 2 }} />
            <Text style={styles.noticeText}>{t.alertDetails.notice}</Text>
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
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xxl,
  },
  carouselContainer: {
    height: 220,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    width: 22,
    backgroundColor: theme.colors.white,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  brandIconTile: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTextStack: {
    flex: 1,
  },
  brandName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  brandCategory: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeading: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  sectionBody: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  stepsList: {
    gap: theme.spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  stepNumber: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textLabel,
    width: 22,
  },
  stepText: {
    flex: 1,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  noticeBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.base,
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  noticeText: {
    flex: 1,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
});
