import {AppButton, AppText} from '@/components/common';
import {useReadQRCodeFromImageMutation} from '@/services/qrcode';
import {colors} from '@/theme/color';
import {QRScannerStackNavigationProps} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {createContext, useCallback, useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Portal} from 'react-native-portalize';

type CameraContextType = {
  torch: boolean;
  toggleTorch: () => void;
  pickImage: () => void;
  isCameraFront: boolean;
  toggleSwitchCamera: () => void;
};

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCameraContext must be used within a CameraProvider');
  }
  return context;
};

export const CameraProvider = ({children}: {children: React.ReactNode}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<QRScannerStackNavigationProps>();
  const [torch, setTorch] = useState(false);
  const [isCameraFront, setIsCameraFront] = useState(false);
  const readFromImageMutation = useReadQRCodeFromImageMutation();

  const toggleTorch = () => {
    setTorch(prev => !prev);
  };

  const toggleSwitchCamera = useCallback(() => {
    setIsCameraFront(prev => !prev);
    if (torch) {
      setTorch(false);
    }
  }, [torch]);

  const pickImage = useCallback(() => {
    ImageCropPicker.openPicker({
      includeBase64: true,
      width: 512,
      height: 512,
    })
      .then(image => {
        //@ts-ignore
        const base64 = `data:${image.mime};base64,${image.data}`;
        readFromImageMutation.mutate(
          {qrCode: base64},
          {
            onSuccess: data => {
              navigation.navigate('QRScannerResult', {
                data: data.data,
              });
            },
            onError: () => {
              Alert.alert(t('error'), t('fail_to_read_qr_image'));
            },
          },
        );
      })
      .catch(() => {});
  }, [navigation, readFromImageMutation, t]);

  const isPickImageLoading = readFromImageMutation.isPending;

  const value: CameraContextType = {
    pickImage,
    torch,
    toggleTorch,
    isCameraFront,
    toggleSwitchCamera,
  };

  return (
    <CameraContext.Provider value={value}>
      {children}
      {isPickImageLoading && (
        <Portal>
          <View style={styles.loading}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color={colors.main} />
              <AppText color={colors.rawBlack}>
                {t('reading_qr_code_image')}
              </AppText>
              <AppButton onPress={readFromImageMutation.reset}>
                <AppText color={colors.white} weight="bold">
                  {t('cancel')}
                </AppText>
              </AppButton>
            </View>
          </View>
        </Portal>
      )}
    </CameraContext.Provider>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContent: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: colors.white,
    gap: 16,
  },
});
