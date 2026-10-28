import { BadgeStatus } from '../components/StatusBadge';

// Mock verification until the API exists: the code's text decides the outcome.
export function getVerificationStatus(code: string): BadgeStatus {
  const normalized = code.toLowerCase();
  if (normalized.includes('not')) return 'not-verified';
  if (normalized.includes('bad') || normalized.includes('inv')) return 'invalid';
  return 'verified';
}

export function isBadgeStatus(value: unknown): value is BadgeStatus {
  return value === 'verified' || value === 'not-verified' || value === 'invalid';
}
