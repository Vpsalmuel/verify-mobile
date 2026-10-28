import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal,
  Dimensions,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { ArrowLeft, Flashlight, FlashlightOff, Keyboard, X, Sparkles, Camera } from 'lucide-react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n';

interface ScanProductScreenProps {
  onBack: () => void;
  onCodeVerified: (code: string) => void;
}

const DEMO_CODE = 'VFY-2849-1036';
const { width } = Dimensions.get('window');
const SCAN_FRAME_SIZE = Math.min(width * 0.68, 280);

export const ScanProductScreen: React.FC<ScanProductScreenProps> = ({ onBack, onCodeVerified }) => {
  const { t } = useI18n();
  const [permission, requestPermission] = useCameraPermissions();
  const [torchOn, setTorchOn] = useState(false);
  const [cameraFailed, setCameraFailed] = useState(false);
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [manualCode, setManualCode] = useState('');
  // The camera fires many events per second; only the first code counts.
  const handled = useRef(false);

  const submit = (code: string) => {
    if (handled.current) return;
    handled.current = true;
    onCodeVerified(code);
  };

  const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    if (data?.trim()) submit(data.trim());
  };

  const handleManualSubmit = () => {
    if (!manualCode.trim()) return;
    setManualModalVisible(false);
    submit(manualCode.trim());
  };

  const cameraReady = permission?.granted && !cameraFailed;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {cameraReady && (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          enableTorch={torchOn}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'datamatrix', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'],
          }}
          onBarcodeScanned={handleBarcodeScanned}
          onMountError={() => setCameraFailed(true)}
        />
      )}

      <SafeAreaView style={styles.overlay} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.circleIconButton}
            activeOpacity={0.7}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={t.common.back}
          >
            <ArrowLeft size={22} color={theme.colors.white} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{t.scan.title}</Text>

          <TouchableOpacity
            style={[styles.circleIconButton, !cameraReady && styles.hidden]}
            activeOpacity={0.7}
            disabled={!cameraReady}
            onPress={() => setTorchOn(!torchOn)}
            accessibilityRole="button"
            accessibilityLabel={torchOn ? t.scan.torchOff : t.scan.torchOn}
          >
            {torchOn ? (
              <Flashlight size={22} color="#FBBF24" />
            ) : (
              <FlashlightOff size={22} color={theme.colors.white} />
            )}
          </TouchableOpacity>
        </View>

        {/* Demo shortcut */}
        <TouchableOpacity
          style={styles.demoButton}
          activeOpacity={0.85}
          onPress={() => submit(DEMO_CODE)}
        >
          <Sparkles size={16} color={theme.colors.primary} />
          <Text style={styles.demoButtonText}>{t.scan.useDemoData}</Text>
        </TouchableOpacity>

        {/* Viewfinder or permission state */}
        <View style={styles.centerSection}>
          {!permission ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : cameraReady ? (
            <>
              <Text style={styles.instructionTitle}>{t.scan.positionTitle}</Text>
              <Text style={styles.instructionSubtitle}>{t.scan.positionSubtitle}</Text>
              <View style={styles.viewfinderFrame}>
                <View style={[styles.cornerMarker, styles.cornerTL]} />
                <View style={[styles.cornerMarker, styles.cornerTR]} />
                <View style={[styles.cornerMarker, styles.cornerBL]} />
                <View style={[styles.cornerMarker, styles.cornerBR]} />
                <View style={styles.scanLine} />
              </View>
            </>
          ) : (
            <View style={styles.permissionCard}>
              <View style={styles.permissionIcon}>
                <Camera size={28} color={theme.colors.white} />
              </View>
              <Text style={styles.instructionTitle}>{t.scan.cameraPermissionTitle}</Text>
              <Text style={styles.permissionBody}>
                {cameraFailed ? t.scan.cameraUnavailable : t.scan.cameraPermissionBody}
              </Text>
              {!cameraFailed && (
                <TouchableOpacity
                  style={styles.permissionButton}
                  activeOpacity={0.85}
                  onPress={() =>
                    permission.canAskAgain ? requestPermission() : Linking.openSettings()
                  }
                >
                  <Text style={styles.permissionButtonText}>
                    {permission.canAskAgain ? t.scan.allowCamera : t.scan.openSettings}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Manual entry */}
        <View style={styles.footerContainer}>
          <Text style={styles.cantScanText}>{t.scan.cantScan}</Text>
          <TouchableOpacity
            style={styles.manualEntryButton}
            activeOpacity={0.8}
            onPress={() => setManualModalVisible(true)}
          >
            <Keyboard size={18} color={theme.colors.white} />
            <Text style={styles.manualEntryText}>{t.scan.enterManually}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Manual Code Input Modal */}
      <Modal
        visible={manualModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setManualModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.scan.modalTitle}</Text>
              <TouchableOpacity
                onPress={() => setManualModalVisible(false)}
                style={styles.modalCloseBtn}
                accessibilityRole="button"
                accessibilityLabel={t.common.cancel}
              >
                <X size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>{t.scan.modalSubtitle}</Text>

            <TextInput
              style={styles.input}
              placeholder="VFY-XXXX-XXXX"
              placeholderTextColor={theme.colors.textTertiary}
              autoCapitalize="characters"
              autoFocus
              value={manualCode}
              onChangeText={setManualCode}
              onSubmitEditing={handleManualSubmit}
            />

            <TouchableOpacity
              style={[
                styles.modalSubmitButton,
                !manualCode.trim() && styles.modalSubmitButtonDisabled,
              ]}
              disabled={!manualCode.trim()}
              onPress={handleManualSubmit}
            >
              <Text style={styles.modalSubmitText}>{t.scan.verifyCode}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  overlay: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  circleIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    opacity: 0,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  demoButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
    height: 36,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.white,
  },
  demoButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semiBold,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  instructionTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.medium,
    textAlign: 'center',
    marginBottom: 6,
  },
  instructionSubtitle: {
    color: '#D4D4D4',
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  viewfinderFrame: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerMarker: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: theme.colors.white,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 16,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 16,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 16,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 16,
  },
  scanLine: {
    width: SCAN_FRAME_SIZE - 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: theme.colors.white,
  },
  permissionCard: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  permissionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  permissionBody: {
    color: '#D4D4D4',
    fontSize: theme.typography.sizes.sm,
    lineHeight: theme.typography.lineHeights.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  permissionButton: {
    height: 48,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  cantScanText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: theme.typography.sizes.sm,
    marginBottom: theme.spacing.md,
  },
  manualEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    height: 48,
    width: '100%',
    borderRadius: theme.radius.md,
  },
  manualEntryText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  modalTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.base,
    lineHeight: 20,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.base,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.medium,
    letterSpacing: 1,
    marginBottom: theme.spacing.base,
  },
  modalSubmitButton: {
    height: 52,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubmitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  modalSubmitText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
});
