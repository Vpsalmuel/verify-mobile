import { LegalDocumentScreen } from '@/screens/settings/LegalDocumentScreen';
import { goBack } from '@/utils/navigation';

export default function PrivacyRoute() {
  return <LegalDocumentScreen kind="privacy" onBack={() => goBack('/settings')} />;
}
