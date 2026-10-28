import { router } from 'expo-router';
import { HomeScreen } from '@/screens/HomeScreen';

export default function HomeRoute() {
  return (
    <HomeScreen
      onVerifyPress={() => router.push('/scan')}
      onViewAllPress={() => router.push('/history')}
      onCheckItemPress={(item) =>
        router.push({ pathname: '/result', params: { status: item.status } })
      }
    />
  );
}
