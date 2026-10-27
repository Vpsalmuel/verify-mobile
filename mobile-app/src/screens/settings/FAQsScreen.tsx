import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';
import { theme } from '../../theme';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    id: '1',
    question: 'How do I verify a product?',
    answer:
      'Scan the supported code on the packaging or enter it manually, then review the available product information.',
  },
  {
    id: '2',
    question: 'What does VERIFIED mean?',
    answer:
      'A Verified result means the Uni-Code matches a registered manufacturer batch with no duplicate or suspicious activity detected.',
  },
  {
    id: '3',
    question: 'What does SUSPICIOUS mean?',
    answer:
      'Suspicious indicates potential anomalies such as multiple scans across distant geographic regions in a short time frame.',
  },
  {
    id: '4',
    question: 'What does NOT VERIFIED mean?',
    answer:
      'Not Verified means the code is not recognized in manufacturer records or the scan was incomplete. Double check spelling or try scanning again.',
  },
  {
    id: '5',
    question: 'How do I report a product?',
    answer:
      'If your verification result returns suspicious or invalid, tap "Report this product" to submit details directly to review authorities.',
  },
];

interface FAQsScreenProps {
  onBack: () => void;
}

export const FAQsScreen: React.FC<FAQsScreenProps> = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FAQs</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            Understand checks, results and safer next steps.
          </Text>

          <View style={styles.accordionContainer}>
            {faqList.map((item) => {
              const isOpen = expandedId === item.id;
              return (
                <View key={item.id} style={styles.itemWrapper}>
                  <TouchableOpacity
                    style={styles.questionRow}
                    activeOpacity={0.7}
                    onPress={() => toggleExpand(item.id)}
                  >
                    <Text style={styles.questionText}>{item.question}</Text>
                    {isOpen ? (
                      <ChevronUp size={18} color={theme.colors.textSecondary} />
                    ) : (
                      <ChevronDown size={18} color={theme.colors.textSecondary} />
                    )}
                  </TouchableOpacity>

                  {isOpen && (
                    <View style={styles.answerBox}>
                      <Text style={styles.answerText}>{item.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
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
    paddingVertical: theme.spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  accordionContainer: {
    gap: theme.spacing.md,
  },
  itemWrapper: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 18,
  },
  questionText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    flex: 1,
    paddingRight: 10,
  },
  answerBox: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: 16,
    paddingTop: 4,
  },
  answerText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});
