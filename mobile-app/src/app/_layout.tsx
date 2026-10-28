import { Stack } from 'expo-router';
import { LanguageProvider } from '@/i18n';
import { ReportsProvider } from '@/state/reports';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ReportsProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ReportsProvider>
    </LanguageProvider>
  );
}
