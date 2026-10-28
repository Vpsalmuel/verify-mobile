import { router } from 'expo-router';
import { ReportAProductScreen } from '@/screens/ReportAProductScreen';
import { goBack } from '@/utils/navigation';

export default function ReportRoute() {
  return (
    <ReportAProductScreen
      onBack={() => goBack('/reports')}
      onSubmitSuccess={() => router.replace('/report/success')}
    />
  );
}
