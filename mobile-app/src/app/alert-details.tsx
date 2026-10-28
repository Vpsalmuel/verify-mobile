import { AlertDetailsScreen } from '@/screens/AlertDetailsScreen';
import { goBack } from '@/utils/navigation';

export default function AlertDetailsRoute() {
  return <AlertDetailsScreen onBack={() => goBack('/alerts')} />;
}
