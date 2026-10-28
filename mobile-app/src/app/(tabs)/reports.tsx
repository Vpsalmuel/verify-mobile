import { router } from 'expo-router';
import { ReportsScreen } from '@/screens/ReportsScreen';

export default function ReportsRoute() {
  return <ReportsScreen onReportAProductPress={() => router.push('/report')} />;
}
