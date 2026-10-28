import { LegalDocumentScreen, termsOfUse } from '@/screens/settings/LegalDocumentScreen';
import { goBack } from '@/utils/navigation';

export default function TermsRoute() {
  return <LegalDocumentScreen document={termsOfUse} onBack={() => goBack('/settings')} />;
}
