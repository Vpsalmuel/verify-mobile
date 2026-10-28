import { router, useLocalSearchParams } from 'expo-router';
import { VerificationResultScreen } from '@/screens/VerificationResultScreen';
import { isBadgeStatus } from '@/utils/verification';

export default function ResultRoute() {
  const params = useLocalSearchParams<{ status?: string; code?: string }>();
  const status = isBadgeStatus(params.status) ? params.status : 'verified';
  const goHome = () => router.dismissTo('/home');

  return (
    <VerificationResultScreen
      status={status}
      uniCode={params.code || undefined}
      onBack={goHome}
      onDone={goHome}
      onScanAnother={() => router.replace('/scan')}
      onTryAgain={() => router.replace('/scan')}
      onReport={() => router.push('/report')}
    />
  );
}
