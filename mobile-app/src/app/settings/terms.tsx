import { LegalDocumentScreen } from '@/screens/settings/LegalDocumentScreen';
import { goBack } from '@/utils/navigation';

export default function TermsRoute() {
  return <LegalDocumentScreen kind="terms" onBack={() => goBack('/settings')} />;
}
