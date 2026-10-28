import { LegalDocumentScreen, privacyPolicy } from '@/screens/settings/LegalDocumentScreen';
import { goBack } from '@/utils/navigation';

export default function PrivacyRoute() {
  return <LegalDocumentScreen document={privacyPolicy} onBack={() => goBack('/settings')} />;
}
