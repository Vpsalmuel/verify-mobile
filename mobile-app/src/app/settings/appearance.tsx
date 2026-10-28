import { AppearanceSettingsScreen } from '@/screens/settings/AppearanceSettingsScreen';
import { goBack } from '@/utils/navigation';

export default function AppearanceSettingsRoute() {
  return <AppearanceSettingsScreen onBack={() => goBack('/settings')} />;
}
