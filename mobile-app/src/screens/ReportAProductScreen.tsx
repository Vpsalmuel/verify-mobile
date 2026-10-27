import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Camera,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from 'lucide-react-native';
import { theme } from '../theme';

interface ReportAProductScreenProps {
  onBack: () => void;
  onSubmitSuccess: () => void;
}

const issueOptions = [
  'Suspected counterfeit',
  'Verification failed',
  'Packaging looks unusual',
  'Product source is unclear',
  'Other',
];

export const ReportAProductScreen: React.FC<ReportAProductScreenProps> = ({
  onBack,
  onSubmitSuccess,
}) => {
  const [productName, setProductName] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('Suspected counterfeit');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [locationExpanded, setLocationExpanded] = useState(false);
  const [address, setAddress] = useState('14 Broad Street, Lagos Island');
  const [storeName, setStoreName] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report a Product</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.introSubtitle}>
            Tell us about the product and the issue you’ve noticed
          </Text>

          {/* Product Name */}
          <Text style={styles.fieldLabel}>
            Product name <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="E.g Emzor Paracetamol"
            placeholderTextColor={theme.colors.textTertiary}
            value={productName}
            onChangeText={setProductName}
          />

          {/* What is wrong with the product? */}
          <Text style={[styles.fieldLabel, { marginTop: theme.spacing.lg }]}>
            What is wrong with the product?
          </Text>
          <View style={styles.radioGroupCard}>
            {issueOptions.map((issue) => {
              const isSelected = selectedIssue === issue;
              return (
                <TouchableOpacity
                  key={issue}
                  style={styles.radioOptionRow}
                  activeOpacity={0.7}
                  onPress={() => setSelectedIssue(issue)}
                >
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioText}>{issue}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Additional details */}
          <Text style={[styles.fieldLabel, { marginTop: theme.spacing.lg }]}>
            Additional details (optional)
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tell us what you noticed"
            placeholderTextColor={theme.colors.textTertiary}
            multiline
            numberOfLines={4}
            value={additionalDetails}
            onChangeText={setAdditionalDetails}
          />

          {/* Add photo upload box */}
          <TouchableOpacity style={styles.photoUploadBox} activeOpacity={0.8}>
            <Camera size={22} color={theme.colors.textSecondary} />
            <View>
              <Text style={styles.photoTitle}>Add photo</Text>
              <Text style={styles.photoSubtitle}>Optional · JPG or PNG, up to 5 MB</Text>
            </View>
          </TouchableOpacity>

          {/* Location Dropdown Section */}
          <View style={styles.locationContainer}>
            <TouchableOpacity
              style={styles.locationHeaderRow}
              activeOpacity={0.7}
              onPress={() => setLocationExpanded(!locationExpanded)}
            >
              <View style={styles.locationHeaderLeft}>
                <MapPin size={18} color={theme.colors.textSecondary} />
                <Text style={styles.locationTitle}>Add location</Text>
              </View>
              {locationExpanded ? (
                <ChevronUp size={18} color={theme.colors.textSecondary} />
              ) : (
                <ChevronDown size={18} color={theme.colors.textSecondary} />
              )}
            </TouchableOpacity>

            {locationExpanded && (
              <View style={styles.locationBody}>
                <Text style={styles.locationBodySubtitle}>
                  Where did you find this products
                </Text>
                <Text style={styles.locationBodyCaption}>
                  Supermarket, pharmacy, open market or retail shop.
                </Text>

                <View style={styles.locationModeRow}>
                  <TouchableOpacity style={styles.locationPillActive}>
                    <Text style={styles.locationPillTextActive}>Use my current location</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.locationPillInactive}>
                    <Text style={styles.locationPillTextInactive}>Enter location manually</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.fieldLabelSmall}>Address or landmark</Text>
                <TextInput
                  style={styles.textInput}
                  value={address}
                  onChangeText={setAddress}
                />

                <Text style={[styles.fieldLabelSmall, { marginTop: 12 }]}>
                  Store or business name
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="E.g ABC supermarket"
                  placeholderTextColor={theme.colors.textTertiary}
                  value={storeName}
                  onChangeText={setStoreName}
                />
              </View>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={onSubmitSuccess}
          >
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>
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
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xxl,
  },
  introSubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  fieldLabel: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  fieldLabelSmall: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textLabel,
    marginBottom: 6,
  },
  requiredStar: {
    color: '#EF4444',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.base,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  radioGroupCard: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.base,
  },
  radioOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: theme.colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  radioText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
  },
  textArea: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.base,
    paddingTop: 12,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textPrimary,
    textAlignVertical: 'top',
    backgroundColor: theme.colors.white,
  },
  photoUploadBox: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.base,
    backgroundColor: theme.colors.surface,
  },
  photoTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  photoSubtitle: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  locationContainer: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 14,
  },
  locationHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
  },
  locationBody: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.base,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 12,
  },
  locationBodySubtitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  locationBodyCaption: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  locationModeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  locationPillActive: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    backgroundColor: '#EFF6FF',
  },
  locationPillTextActive: {
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
  locationPillInactive: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
  },
  locationPillTextInactive: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  submitButton: {
    height: 52,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
});
