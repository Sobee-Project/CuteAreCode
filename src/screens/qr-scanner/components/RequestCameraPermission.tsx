import {AppButton, AppText} from '@/components/common';
import {useCameraContext} from '@/context/CameraContext';
import {colors} from '@/theme/color';
import {WIDTH, vs} from '@/utils/responsive';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, StatusBar, StyleSheet, View} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

const RequestCameraPermission = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const {t} = useTranslation();

  const {pickImage} = useCameraContext();

  const onPressRequestCameraPermission = useCallback(async () => {
    if (hasPermission) {
      return;
    }
    const result = await requestPermission();

    if (!result) {
      Alert.alert(t('permission_denied'), t('please_grant_camera_permission'));
    }
  }, [hasPermission, requestPermission, t]);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/illustrations/camera.webp')}
        style={styles.image}
        resizeMode="contain"
      />
      <AppText weight="semiBold" size={20} align="center">
        {t('request_camera_permission')}
      </AppText>
      <View style={styles.actionContainer}>
        <AppButton
          onPress={onPressRequestCameraPermission}
          style={{
            maxWidth: 240,
          }}>
          <AppText color={colors.white} weight="bold">
            {t('grant_permission')}
          </AppText>
        </AppButton>
        <AppText>{t('or')}</AppText>
        <AppButton
          onPress={pickImage}
          style={{
            maxWidth: 240,
          }}
          color={colors.secondary}>
          <AppText color={colors.white} weight="bold">
            {t('pick_qr_code_from_library')}
          </AppText>
        </AppButton>
      </View>
      <StatusBar
        backgroundColor={colors.transparent}
        barStyle="dark-content"
        translucent
      />
    </View>
  );
};

export default RequestCameraPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(20),
    padding: 20,
    backgroundColor: colors.white,
  },
  image: {
    width: WIDTH - 40,
    height: WIDTH - 100,
  },
  actionContainer: {
    gap: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
