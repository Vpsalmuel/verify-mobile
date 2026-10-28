import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '../../theme';

interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
}

// Placeholder copy from Figma (Settings frames 2570:20828 and 2570:20849).
export const privacyPolicy: LegalDocument = {
  title: 'Privacy policy',
  intro: 'This content requires review by the VERYFY team before release.',
  sections: [
    {
      heading: 'Information in this prototype',
      body: 'This placeholder describes where information about account details, verification activity, and submitted reports may be explained.',
    },
    {
      heading: 'Before release',
      body: 'The VERYFY team must review and replace this text with an approved policy before launch.',
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: 'Terms of use',
  intro: 'This content requires review by the VERYFY team before release.',
  sections: [
    {
      heading: 'Using VERYFY',
      body: 'This placeholder will explain acceptable use of product checks, results, and reporting features.',
    },
    {
      heading: 'Verification limitations',
      body: 'Verification results depend on available information and do not guarantee that every product is genuine.',
    },
    {
      heading: 'Before release',
      body: 'The VERYFY team must review and replace this text with approved terms before launch.',
    },
  ],
};

interface LegalDocumentScreenProps {
  document: LegalDocument;
  onBack: () => void;
}

export const LegalDocumentScreen: React.FC<LegalDocumentScreenProps> = ({ document, onBack }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
            <ArrowLeft size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{document.title}</Text>
          <View style={styles.backBtn} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.intro}>{document.intro}</Text>
          {document.sections.map((section) => (
            <View key={section.heading} style={styles.section}>
              <Text style={styles.sectionHeading}>{section.heading}</Text>
              <Text style={styles.sectionBody}>{section.body}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    height: 42,
    marginBottom: theme.spacing.base,
  },
  backBtn: {
    width: 42,
    height: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.xl,
  },
  intro: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeights.md,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionHeading: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  sectionBody: {
    fontSize: theme.typography.sizes.sm,
    color: '#555555',
    lineHeight: theme.typography.lineHeights.sm,
  },
});
