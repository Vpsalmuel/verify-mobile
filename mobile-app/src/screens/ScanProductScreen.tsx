import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Flashlight,
  FlashlightOff,
  Keyboard,
  X,
  QrCode,
  ScanLine,
} from 'lucide-react-native';
import { theme } from '../theme';

interface ScanProductScreenProps {
  onBack: () => void;
  onCodeVerified: (code: string) => void;
}

const { width } = Dimensions.get('window');
const SCAN_FRAME_SIZE = width * 0.72;

export const ScanProductScreen: React.FC<ScanProductScreenProps> = ({
  onBack,
  onCodeVerified,
}) => {
  const [torchOn, setTorchOn] = useState(false);
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const handleManualSubmit = () => {
    if (!manualCode.trim()) return;
    setManualModalVisible(false);
    onCodeVerified(manualCode.trim());
  };

  const handleSimulateScan = () => {
    // Quick test helper triggering verification
    onCodeVerified('VFY-2849-1036');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Camera Simulator Background (Deep dark viewfinder) */}
      <View style={styles.cameraBackground}>
        {/* Top Header Bar */}
        <SafeAreaView style={styles.safeHeader}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.circleIconButton}
              activeOpacity={0.7}
              onPress={onBack}
            >
              <ArrowLeft size={22} color={theme.colors.white} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Scan product</Text>

            <TouchableOpacity
              style={styles.circleIconButton}
              activeOpacity={0.7}
              onPress={() => setTorchOn(!torchOn)}
            >
              {torchOn ? (
                <Flashlight size={22} color="#FBBF24" />
              ) : (
                <FlashlightOff size={22} color={theme.colors.white} />
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Viewfinder Target Section */}
        <View style={styles.centerSection}>
          <Text style={styles.instructionTitle}>Position the code</Text>
          <Text style={styles.instructionSubtitle}>
            Align the product code within the frame
          </Text>

          <TouchableOpacity
            style={styles.viewfinderFrame}
            activeOpacity={0.9}
            onPress={handleSimulateScan}
          >
            {/* Corner Markers */}
            <View style={[styles.cornerMarker, styles.cornerTL]} />
            <View style={[styles.cornerMarker, styles.cornerTR]} />
            <View style={[styles.cornerMarker, styles.cornerBL]} />
            <View style={[styles.cornerMarker, styles.cornerBR]} />

            {/* Pulsing Scan Line Indicator */}
            <View style={styles.scanTargetInner}>
              <ScanLine size={48} color="rgba(255,255,255,0.4)" />
              <Text style={styles.tapToSimulate}>Tap to scan mock code</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <SafeAreaView style={styles.safeFooter}>
          <View style={styles.footerContainer}>
            <Text style={styles.cantScanText}>Can't scan the code?</Text>
            <TouchableOpacity
              style={styles.manualEntryButton}
              activeOpacity={0.8}
              onPress={() => setManualModalVisible(true)}
            >
              <Keyboard size={18} color={theme.colors.white} />
              <Text style={styles.manualEntryText}>Enter code manually</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

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
              <Text style={styles.modalTitle}>Enter Uni-Code</Text>
              <TouchableOpacity
                onPress={() => setManualModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Type the code found on the product packaging label (e.g. VFY-2849-1036).
            </Text>

            <TextInput
              style={styles.input}
              placeholder="VFY-XXXX-XXXX"
              placeholderTextColor={theme.colors.textTertiary}
              autoCapitalize="characters"
              autoFocus
              value={manualCode}
              onChangeText={setManualCode}
            />

            <TouchableOpacity
              style={[
                styles.modalSubmitButton,
                !manualCode.trim() && styles.modalSubmitButtonDisabled,
              ]}
              disabled={!manualCode.trim()}
              onPress={handleManualSubmit}
            >
              <Text style={styles.modalSubmitText}>Verify code</Text>
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
    backgroundColor: '#0A0A0A',
  },
  cameraBackground: {
    flex: 1,
    backgroundColor: '#121316',
    justifyContent: 'space-between',
  },
  safeHeader: {
    backgroundColor: 'transparent',
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  instructionTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    marginBottom: 4,
    textAlign: 'center',
  },
  instructionSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: theme.typography.sizes.sm,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  viewfinderFrame: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
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
  scanTargetInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tapToSimulate: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: theme.typography.sizes.xs,
  },
  safeFooter: {
    backgroundColor: 'transparent',
  },
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
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
