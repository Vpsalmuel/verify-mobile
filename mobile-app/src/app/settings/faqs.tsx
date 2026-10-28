import { FAQsScreen } from '@/screens/settings/FAQsScreen';
import { goBack } from '@/utils/navigation';

export default function FAQsRoute() {
  return <FAQsScreen onBack={() => goBack('/settings')} />;
}
