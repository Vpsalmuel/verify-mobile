import { useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { VerifyingProductScreen } from '@/screens/VerifyingProductScreen';
import { getVerificationStatus } from '@/utils/verification';

export default function VerifyingRoute() {
  const { code = '' } = useLocalSearchParams<{ code?: string }>();

  const showResult = useCallback(() => {
    router.replace({
      pathname: '/result',
      params: { code, status: getVerificationStatus(code) },
    });
  }, [code]);

  return <VerifyingProductScreen onComplete={showResult} />;
}
