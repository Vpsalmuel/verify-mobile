import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react-native';
import { theme } from '../theme';

export type BadgeStatus = 'verified' | 'not-verified' | 'invalid';

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  let bg = theme.colors.verifiedBorder;
  let textColor = theme.colors.verifiedText;
  let defaultLabel = 'Verified';
  let IconComponent = CheckCircle2;

  if (status === 'not-verified') {
    bg = theme.colors.notVerifiedBorder;
    textColor = theme.colors.white;
    defaultLabel = 'Not verified';
    IconComponent = AlertCircle;
  } else if (status === 'invalid') {
    bg = theme.colors.invalidBorder;
    textColor = theme.colors.white;
    defaultLabel = 'Invalid';
    IconComponent = XCircle;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <IconComponent size={12} color={textColor} />
      <Text style={[styles.text, { color: textColor }]}>
        {label || defaultLabel}
      </Text>
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
    fontWeight: theme.typography.weights.medium,
  },
});
