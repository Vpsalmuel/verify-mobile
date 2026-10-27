import React, { useState } from 'react';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ScanProductScreen } from './src/screens/ScanProductScreen';
import {
  VerificationResultScreen,
  VerificationState,
} from './src/screens/VerificationResultScreen';
import { SettingsContainerScreen } from './src/screens/settings/SettingsContainerScreen';
import { AlertDetailsScreen } from './src/screens/AlertDetailsScreen';
import { ReportsScreen } from './src/screens/ReportsScreen';
import { ReportAProductScreen } from './src/screens/ReportAProductScreen';
import { ReportSuccessScreen } from './src/screens/ReportSuccessScreen';
import { TabKey } from './src/components/BottomNav';

type AppStep =
  | 'splash'
  | 'onboarding'
  | 'main'
  | 'scan'
  | 'result'
  | 'report_form'
  | 'report_success';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('splash');
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [resultState, setResultState] = useState<VerificationState>('verified');
  const [scannedCode, setScannedCode] = useState<string>('VFY-2849-1036');

  if (currentStep === 'splash') {
    return <SplashScreen onFinish={() => setCurrentStep('onboarding')} />;
  }

  if (currentStep === 'onboarding') {
    return (
      <OnboardingScreen
        onScanPress={() => {
          setCurrentStep('main');
        }}
      />
    );
  }

  if (currentStep === 'scan') {
    return (
      <ScanProductScreen
        onBack={() => setCurrentStep('main')}
        onCodeVerified={(code) => {
          setScannedCode(code);
          if (code.toLowerCase().includes('not')) {
            setResultState('not-verified');
          } else if (code.toLowerCase().includes('bad') || code.toLowerCase().includes('inv')) {
            setResultState('invalid');
          } else {
            setResultState('verified');
          }
          setCurrentStep('result');
        }}
      />
    );
  }

  if (currentStep === 'result') {
    return (
      <VerificationResultScreen
        status={resultState}
        uniCode={scannedCode}
        onBack={() => setCurrentStep('main')}
        onDone={() => setCurrentStep('main')}
        onScanAnother={() => setCurrentStep('scan')}
        onTryAgain={() => setCurrentStep('scan')}
        onReport={() => {
          setCurrentStep('report_form');
        }}
      />
    );
  }

  if (currentStep === 'report_form') {
    return (
      <ReportAProductScreen
        onBack={() => setCurrentStep('main')}
        onSubmitSuccess={() => setCurrentStep('report_success')}
      />
    );
  }

  if (currentStep === 'report_success') {
    return (
      <ReportSuccessScreen
        onDone={() => {
          setActiveTab('reports');
          setCurrentStep('main');
        }}
        onReportAnother={() => setCurrentStep('report_form')}
      />
    );
  }

  // Active Tab Router
  if (activeTab === 'reports') {
    return (
      <ReportsScreen
        activeTab={activeTab}
        onTabPress={setActiveTab}
        onScanPress={() => setCurrentStep('scan')}
        onReportAProductPress={() => setCurrentStep('report_form')}
      />
    );
  }

  if (activeTab === 'alerts') {
    return (
      <AlertDetailsScreen
        onBack={() => setActiveTab('home')}
      />
    );
  }

  if (activeTab === 'settings') {
    return (
      <SettingsContainerScreen
        activeTab={activeTab}
        onTabPress={setActiveTab}
        onScanPress={() => setCurrentStep('scan')}
      />
    );
  }

  return (
    <HomeScreen
      activeTab={activeTab}
      onTabPress={setActiveTab}
      onVerifyPress={() => {
        setCurrentStep('scan');
      }}
      onSafetyTipsPress={() => {
        console.log('Open product safety tips');
      }}
      onCheckItemPress={(item) => {
        setResultState(item.status);
        setCurrentStep('result');
      }}
    />
  );
}
