import { NotificationsSettingsScreen } from '@/screens/settings/NotificationsSettingsScreen';
import { goBack } from '@/utils/navigation';

export default function NotificationsSettingsRoute() {
  return <NotificationsSettingsScreen onBack={() => goBack('/settings')} />;
}
