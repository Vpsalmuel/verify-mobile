import { LanguageSettingsScreen } from '@/screens/settings/LanguageSettingsScreen';
import { goBack } from '@/utils/navigation';

export default function LanguageSettingsRoute() {
  return <LanguageSettingsScreen onBack={() => goBack('/settings')} />;
}
