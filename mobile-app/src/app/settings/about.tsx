import { AboutScreen } from '@/screens/settings/AboutScreen';
import { goBack } from '@/utils/navigation';

export default function AboutRoute() {
  return <AboutScreen onBack={() => goBack('/settings')} />;
}
