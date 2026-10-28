import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { ImageIcon } from 'lucide-react-native';
import { theme } from '../theme';

const tips = [
  'Buy from trusted and traceable suppliers where possible.',
  'Compare the packaging with the original, and look for unusual signs and missing details.',
  'A low price can be a warning sign, but it doesn’t provide that a product is counterfeit.',
  'Use Veryfy whenever a supported verification code is available.',
];

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
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          {/* TODO(figma asset): shopper photo from Figma node 2570:21005 */}
          <View style={styles.heroPlaceholder}>
            <ImageIcon size={36} color={theme.colors.textTertiary} />
          </View>
          <View style={styles.handle} />

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>Stay safer when buying products</Text>
              <Text style={styles.subtitle}>Simple signs can help you decide when to verify.</Text>
            </View>

            <View style={styles.tips}>
              {tips.map((tip, index) => (
                <View key={tip} style={styles.tipRow}>
                  <Text style={styles.tipNumber}>{String(index + 1).padStart(2, '0')}</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={onScanPress}>
              <Text style={styles.primaryButtonText}>Scan a product</Text>
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
  heroPlaceholder: {
    height: 252,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
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
