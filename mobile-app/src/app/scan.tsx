import { router } from 'expo-router';
import { ScanProductScreen } from '@/screens/ScanProductScreen';
import { goBack } from '@/utils/navigation';

export default function ScanRoute() {
  return (
    <ScanProductScreen
      onBack={() => goBack('/home')}
      onCodeVerified={(code) => router.replace({ pathname: '/verifying', params: { code } })}
    />
  );
}
