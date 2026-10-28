import { router } from 'expo-router';
import { HistoryScreen } from '@/screens/HistoryScreen';
import { goBack } from '@/utils/navigation';

export default function HistoryRoute() {
  return (
    <HistoryScreen
      onBack={() => goBack('/home')}
      onScanPress={() => router.push('/scan')}
      onItemPress={(item) => router.push({ pathname: '/result', params: { status: item.status } })}
    />
  );
}
