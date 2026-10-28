import { router } from 'expo-router';
import { ReportSuccessScreen } from '@/screens/ReportSuccessScreen';

export default function ReportSuccessRoute() {
  return (
    <ReportSuccessScreen
      onDone={() => router.dismissTo('/reports')}
      onReportAnother={() => router.replace('/report')}
    />
  );
}
