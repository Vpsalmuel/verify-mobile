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
  Image,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ArrowLeft, Camera, MapPin, ChevronDown, ChevronUp, X, LocateFixed } from 'lucide-react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n';
import { IssueKey, useReports } from '../state/reports';

interface ReportAProductScreenProps {
  onBack: () => void;
  onSubmitSuccess: () => void;
}

const issueOptions: IssueKey[] = [
  'counterfeit',
  'verificationFailed',
  'unusualPackaging',
  'sourceUnclear',
  'other',
];

type LocationMode = 'current' | 'manual';
type LocationStatus = 'idle' | 'loading' | 'denied' | 'error';

function formatAddress(place: Location.LocationGeocodedAddress | undefined, coords: Location.LocationObjectCoords) {
  if (place) {
    const street = [place.streetNumber, place.street].filter(Boolean).join(' ');
    const parts = [place.name !== street ? place.name : null, street, place.district ?? place.city, place.region];
    const text = parts.filter(Boolean).join(', ');
    if (text) return text;
  }
  return `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;
}

export const ReportAProductScreen: React.FC<ReportAProductScreenProps> = ({
  onBack,
  onSubmitSuccess,
}) => {
  const { t } = useI18n();
  const { addReport } = useReports();
  const [productName, setProductName] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueKey>('counterfeit');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [locationExpanded, setLocationExpanded] = useState(false);
  const [locationMode, setLocationMode] = useState<LocationMode>('manual');
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [address, setAddress] = useState('');
  const [storeName, setStoreName] = useState('');

  const useCurrentLocation = async () => {
    setLocationMode('current');
    setLocationStatus('loading');
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setLocationStatus('denied');
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      let place: Location.LocationGeocodedAddress | undefined;
      try {
        // Street lookup is only available on Android and iOS; fall back to coordinates.
        [place] = await Location.reverseGeocodeAsync(position.coords);
      } catch {
        place = undefined;
      }
      setAddress(formatAddress(place, position.coords));
      setLocationStatus('idle');
    } catch {
      setLocationStatus('error');
    }
  };

  const pickPhoto = async (source: 'camera' | 'library') => {
    const permission =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      const message =
        source === 'camera' ? t.reportForm.cameraPermissionDenied : t.reportForm.libraryPermissionDenied;
      Alert.alert(t.reportForm.photoSourceTitle, message, [
        { text: t.common.cancel, style: 'cancel' },
        { text: t.scan.openSettings, onPress: () => Linking.openSettings() },
      ]);
      return;
    }
    const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 0.7 };
    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);
    if (!result.canceled && result.assets[0]) setPhotoUri(result.assets[0].uri);
  };

  const choosePhotoSource = () => {
    // Web can't show a multi-button alert; go straight to the file picker.
    if (Platform.OS === 'web') {
      pickPhoto('library');
      return;
    }
    Alert.alert(t.reportForm.photoSourceTitle, t.reportForm.photoSourceBody, [
      { text: t.reportForm.takePhoto, onPress: () => pickPhoto('camera') },
      { text: t.reportForm.chooseFromLibrary, onPress: () => pickPhoto('library') },
      { text: t.common.cancel, style: 'cancel' },
    ]);
  };

  const handleSubmit = () => {
    if (!productName.trim()) {
      setShowNameError(true);
      return;
    }
    addReport({
      productName: productName.trim(),
      issue: selectedIssue,
      details: additionalDetails.trim() || undefined,
      photoUri: photoUri ?? undefined,
      address: address.trim() || undefined,
      storeName: storeName.trim() || undefined,
    });
    onSubmitSuccess();
  };

  const locationMessage =
    locationStatus === 'denied'
      ? t.reportForm.locationPermissionDenied
      : locationStatus === 'error'
        ? t.reportForm.locationError
        : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={t.common.back}
          >
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.common.reportAProduct}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.introSubtitle}>{t.reportForm.intro}</Text>

          {/* Product Name */}
          <Text style={styles.fieldLabel}>
            {t.reportForm.productName} <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={[styles.textInput, showNameError && !productName.trim() && styles.textInputError]}
            placeholder={t.reportForm.productNamePlaceholder}
            placeholderTextColor={theme.colors.textTertiary}
            value={productName}
            onChangeText={setProductName}
          />
          {showNameError && !productName.trim() && (
            <Text style={styles.errorText}>{t.reportForm.productNameRequired}</Text>
          )}

          {/* What is wrong with the product? */}
          <Text style={[styles.fieldLabel, { marginTop: theme.spacing.lg }]}>
            {t.reportForm.whatIsWrong}
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
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                >
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioText}>{t.reportForm.issues[issue]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Additional details */}
          <Text style={[styles.fieldLabel, { marginTop: theme.spacing.lg }]}>
            {t.reportForm.additionalDetails}
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder={t.reportForm.additionalDetailsPlaceholder}
            placeholderTextColor={theme.colors.textTertiary}
            multiline
            numberOfLines={4}
            value={additionalDetails}
            onChangeText={setAdditionalDetails}
          />

          {/* Photo */}
          {photoUri ? (
            <View style={[styles.photoUploadBox, styles.photoSelectedBox]}>
              <Image source={{ uri: photoUri }} style={styles.photoThumb} />
              <TouchableOpacity style={styles.photoChange} activeOpacity={0.7} onPress={choosePhotoSource}>
                <Text style={styles.photoTitle}>{t.reportForm.changePhoto}</Text>
                <Text style={styles.photoSubtitle}>{t.reportForm.photoHint}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoRemove}
                activeOpacity={0.7}
                onPress={() => setPhotoUri(null)}
                accessibilityRole="button"
                accessibilityLabel={t.reportForm.removePhoto}
              >
                <X size={18} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.photoUploadBox} activeOpacity={0.8} onPress={choosePhotoSource}>
              <Camera size={22} color={theme.colors.textSecondary} />
              <View>
                <Text style={styles.photoTitle}>{t.reportForm.addPhoto}</Text>
                <Text style={styles.photoSubtitle}>{t.reportForm.photoHint}</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Location */}
          <View style={styles.locationContainer}>
            <TouchableOpacity
              style={styles.locationHeaderRow}
              activeOpacity={0.7}
              onPress={() => setLocationExpanded(!locationExpanded)}
            >
              <View style={styles.locationHeaderLeft}>
                <MapPin size={18} color={theme.colors.textSecondary} />
                <Text style={styles.locationTitle}>{t.reportForm.addLocation}</Text>
              </View>
              {locationExpanded ? (
                <ChevronUp size={18} color={theme.colors.textSecondary} />
              ) : (
                <ChevronDown size={18} color={theme.colors.textSecondary} />
              )}
            </TouchableOpacity>

            {locationExpanded && (
              <View style={styles.locationBody}>
                <Text style={styles.locationBodySubtitle}>{t.reportForm.whereFound}</Text>
                <Text style={styles.locationBodyCaption}>{t.reportForm.whereFoundHint}</Text>

                <View style={styles.locationModeRow}>
                  <TouchableOpacity
                    style={locationMode === 'current' ? styles.locationPillActive : styles.locationPillInactive}
                    activeOpacity={0.7}
                    onPress={useCurrentLocation}
                    disabled={locationStatus === 'loading'}
                  >
                    <LocateFixed
                      size={12}
                      color={locationMode === 'current' ? theme.colors.primary : theme.colors.textSecondary}
                    />
                    <Text
                      style={
                        locationMode === 'current'
                          ? styles.locationPillTextActive
                          : styles.locationPillTextInactive
                      }
                    >
                      {t.reportForm.useCurrentLocation}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={locationMode === 'manual' ? styles.locationPillActive : styles.locationPillInactive}
                    activeOpacity={0.7}
                    onPress={() => {
                      setLocationMode('manual');
                      setLocationStatus('idle');
                    }}
                  >
                    <Text
                      style={
                        locationMode === 'manual'
                          ? styles.locationPillTextActive
                          : styles.locationPillTextInactive
                      }
                    >
                      {t.reportForm.enterManually}
                    </Text>
                  </TouchableOpacity>
                </View>

                {locationStatus === 'loading' && (
                  <View style={styles.locationStatusRow}>
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                    <Text style={styles.locationStatusText}>{t.reportForm.findingLocation}</Text>
                  </View>
                )}
                {locationMessage && (
                  <Text style={[styles.locationStatusText, styles.locationStatusError]}>
                    {locationMessage}
                  </Text>
                )}

                <Text style={styles.fieldLabelSmall}>{t.reportForm.address}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={t.reportForm.addressPlaceholder}
                  placeholderTextColor={theme.colors.textTertiary}
                  value={address}
                  onChangeText={setAddress}
                />

                <Text style={[styles.fieldLabelSmall, { marginTop: 12 }]}>{t.reportForm.storeName}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={t.reportForm.storeNamePlaceholder}
                  placeholderTextColor={theme.colors.textTertiary}
                  value={storeName}
                  onChangeText={setStoreName}
                />
              </View>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.85} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t.reportForm.submit}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  textInputError: {
    borderColor: theme.colors.invalidBorder,
  },
  errorText: {
    marginTop: 6,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.invalidText,
  },
  photoSelectedBox: {
    borderStyle: 'solid',
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
  },
  photoThumb: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
  },
  photoChange: {
    flex: 1,
  },
  photoRemove: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  locationStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  locationStatusText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  locationStatusError: {
    color: theme.colors.invalidText,
    marginBottom: 12,
    lineHeight: theme.typography.lineHeights.xs,
  },
});
