import { router } from 'expo-router';
import { SplashScreen } from '@/screens/SplashScreen';

export default function SplashRoute() {
  return <SplashScreen onFinish={() => router.replace('/onboarding')} />;
}
