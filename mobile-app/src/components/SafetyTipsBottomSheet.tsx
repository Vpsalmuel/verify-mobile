import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n';

interface SafetyTipsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onScanPress: () => void;
}

export const SafetyTipsBottomSheet: React.FC<SafetyTipsBottomSheetProps> = ({
  visible,
  onClose,
  onScanPress,
}) => {
  const { t } = useI18n();
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <Image
            source={require('../assets/safety-tips-hero.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.handle} />

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>{t.safetyTips.title}</Text>
              <Text style={styles.subtitle}>{t.safetyTips.subtitle}</Text>
            </View>

            <View style={styles.tips}>
              {t.safetyTips.tips.map((tip, index) => (
                <View key={tip} style={styles.tipRow}>
                  <Text style={styles.tipNumber}>{String(index + 1).padStart(2, '0')}</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={onScanPress}>
              <Text style={styles.primaryButtonText}>{t.common.scanAProduct}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  sheet: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    overflow: 'hidden',
    maxHeight: '92%',
  },
  heroImage: {
    width: '100%',
    height: 252,
  },
  handle: {
    position: 'absolute',
    top: 7,
    alignSelf: 'center',
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.white,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    gap: theme.spacing.xxl,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.lineHeights.xl,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
  },
  tips: {
    gap: theme.spacing.lg,
  },
  tipRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  tipNumber: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeights.sm,
  },
  tipText: {
    flex: 1,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeights.sm,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
  },
  primaryButton: {
    height: 54,
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
