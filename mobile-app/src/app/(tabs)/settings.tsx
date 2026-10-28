import { router } from 'expo-router';
import { SettingsMainScreen } from '@/screens/settings/SettingsMainScreen';

export default function SettingsRoute() {
  return <SettingsMainScreen onNavigateSub={(screen) => router.push(`/settings/${screen}`)} />;
}
