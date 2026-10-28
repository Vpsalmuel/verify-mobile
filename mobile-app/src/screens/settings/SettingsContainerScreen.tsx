import React, { useState } from 'react';
import { SettingsMainScreen, SettingsSubScreen } from './SettingsMainScreen';
import { NotificationsSettingsScreen } from './NotificationsSettingsScreen';
import { LanguageSettingsScreen } from './LanguageSettingsScreen';
import { AppearanceSettingsScreen } from './AppearanceSettingsScreen';
import { FAQsScreen } from './FAQsScreen';
import { AboutScreen } from './AboutScreen';
import { LegalDocumentScreen, privacyPolicy, termsOfUse } from './LegalDocumentScreen';
import { TabKey } from '../../components/BottomNav';

interface SettingsContainerScreenProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  onScanPress: () => void;
}

export const SettingsContainerScreen: React.FC<SettingsContainerScreenProps> = ({
  activeTab,
  onTabPress,
  onScanPress,
}) => {
  const [currentSubScreen, setCurrentSubScreen] = useState<SettingsSubScreen>('menu');

  if (currentSubScreen === 'notifications') {
    return <NotificationsSettingsScreen onBack={() => setCurrentSubScreen('menu')} />;
  }

  if (currentSubScreen === 'language') {
    return <LanguageSettingsScreen onBack={() => setCurrentSubScreen('menu')} />;
  }

  if (currentSubScreen === 'appearance') {
    return <AppearanceSettingsScreen onBack={() => setCurrentSubScreen('menu')} />;
  }

  if (currentSubScreen === 'faqs') {
    return <FAQsScreen onBack={() => setCurrentSubScreen('menu')} />;
  }

  if (currentSubScreen === 'about') {
    return <AboutScreen onBack={() => setCurrentSubScreen('menu')} />;
  }

  if (currentSubScreen === 'terms') {
    return <LegalDocumentScreen document={termsOfUse} onBack={() => setCurrentSubScreen('menu')} />;
  }

  if (currentSubScreen === 'privacy') {
    return <LegalDocumentScreen document={privacyPolicy} onBack={() => setCurrentSubScreen('menu')} />;
  }

  return (
    <SettingsMainScreen
      onNavigateSub={setCurrentSubScreen}
      activeTab={activeTab}
      onTabPress={onTabPress}
      onScanPress={onScanPress}
    />
  );
};
