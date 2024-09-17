import {useCameraContext} from '@/context/CameraContext';
import {colors} from '@/theme/color';
import {QRScannerStackScreenProps} from '@/types/navigation';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import AdditionalActions from './components/AdditionalActions';
import CameraActions from './components/CameraActions';
import NoDeviceFound from './components/NoDeviceFound';
import Overlay from './components/Overlay';
import RequestCameraPermission from './components/RequestCameraPermission';

const QrScanner = ({navigation}: QRScannerStackScreenProps<'QRScanner'>) => {
  const {t} = useTranslation();
  const cameraRef = useRef<Camera>(null);
  const {torch, isCameraFront} = useCameraContext();

  const cameraPosition = isCameraFront ? 'front' : 'back';

  const {hasPermission} = useCameraPermission();
  const device = useCameraDevice(cameraPosition);
  const format = useCameraFormat(device, [{photoHdr: true}, {videoHdr: true}]);
  const hasTorch = device?.hasTorch;

  useEffect(() => {
    navigation.setOptions({
      headerShown: !hasPermission,
      headerTitleAlign: 'left',
      headerTitle: !hasPermission ? t('app_name') : undefined,
      headerRight: ({tintColor}) => (
        <AdditionalActions tintColor={tintColor} isHeader />
      ),
    });
  }, [hasPermission, navigation, t]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async data => {
      const firstCode = data[0];
      if (!firstCode) {
        return Alert.alert(t('qr_code_not_found'));
      }
      const value = firstCode.value;
      if (!value) {
        return Alert.alert(t('qr_code_no_value'));
      }

      navigation.navigate('QRScannerResult', {
        data: value,
      });
    },
  });

  const onError = (e: CameraRuntimeError) => {
    switch (e.code) {
      case 'system/camera-is-restricted':
        console.log('Camera is restricted');
        break;
      default:
        console.log('Camera error', e.message);
        break;
    }
  };

  if (!hasPermission) {
    return <RequestCameraPermission />;
  }
  if (device == null) {
    return <NoDeviceFound />;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive
        format={format}
        photoHdr={format?.supportsPhotoHdr}
        videoHdr={format?.supportsVideoHdr}
        onError={onError}
        torch={torch ? 'on' : 'off'}
      />
      <Overlay />
      <AdditionalActions />
      <CameraActions hasTorch={hasTorch} />
      <StatusBar
        backgroundColor={colors.transparent}
        barStyle="dark-content"
        translucent
      />
    </View>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
