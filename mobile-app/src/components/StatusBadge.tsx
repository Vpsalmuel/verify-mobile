import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BadgeCheck, CircleHelp, OctagonX } from 'lucide-react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n';

export type BadgeStatus = 'verified' | 'not-verified' | 'invalid';

// Filled icons matching Figma's verified-filled / help-filled / dangerous-filled:
// the shape is filled with the label colour and the glyph is cut out in the badge colour.
export const statusIcons = {
  verified: BadgeCheck,
  'not-verified': CircleHelp,
  invalid: OctagonX,
};

// Figma "Status Badge" (Small), as used in list rows.
const variants: Record<
  BadgeStatus,
  { bg: string; text: string; label: 'verified' | 'notVerified' | 'invalid' }
> = {
  verified: { bg: theme.colors.verifiedBorder, text: theme.colors.verifiedText, label: 'verified' },
  'not-verified': {
    bg: theme.colors.surface,
    text: theme.colors.textForeground,
    label: 'notVerified',
  },
  invalid: { bg: theme.colors.invalidBorder, text: theme.colors.white, label: 'invalid' },
};

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const { t } = useI18n();
  const variant = variants[status];
  const Icon = statusIcons[status];

  return (
    <View style={[styles.badge, { backgroundColor: variant.bg }]}>
      <Icon size={16} color={variant.bg} fill={variant.text} />
      <Text style={[styles.text, { color: variant.text }]}>{label || t.status[variant.label]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    gap: 4,
  },
  text: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.regular,
  },
});
