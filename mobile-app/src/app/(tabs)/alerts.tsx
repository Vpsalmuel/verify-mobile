import { router } from 'expo-router';
import { AlertsScreen } from '@/screens/AlertsScreen';

export default function AlertsRoute() {
  return <AlertsScreen onAlertPress={() => router.push('/alert-details')} />;
}
