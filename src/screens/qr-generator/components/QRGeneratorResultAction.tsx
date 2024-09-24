import {AppButton, AppText} from '@/components/common';
import {DownloadIcon, GenerateQRCodeIcon, ShareIcon} from '@/components/icons';
import {colors} from '@/theme/color';
import {QRScannerStackNavigationProps} from '@/types/navigation';
import {QRCodeGeneratorReq} from '@/types/qr';
import {APP_DIR, APP_NAME} from '@/utils/constant';
import {FileUtils} from '@/utils/rnfs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {LogBox, StyleSheet, ToastAndroid, View} from 'react-native';
import Share from 'react-native-share';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

type Props = {
  data: QRCodeGeneratorReq & {qrCodeImage: string};
  onReset: () => void;
};

const QRGeneratorResultAction = ({data, onReset}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation<QRScannerStackNavigationProps>();

  const onPressGenerateNewQR = () => {
    onReset();
    navigation.goBack();
  };

  const onPressShare = () => {
    Share.open({
      url: data.qrCodeImage,
      type: 'image/png',
      isNewTask: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onPressDownload = () => {
    const filename = `${APP_NAME}_${Date.now()}.png`;
    const path = `${APP_DIR}/${filename}`;
    FileUtils.writeImageFile(path, data.qrCodeImage)
      .then(() => {
        console.log('file saved');
        ToastAndroid.show(t('file_saved'), ToastAndroid.SHORT);
      })
      .catch(e => {
        console.log('file save error', e);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <AppButton
          showShadow
          variant="outline"
          rightIcon={<DownloadIcon stroke={colors.main} />}
          onPress={onPressDownload}>
          <AppText color={colors.main} weight="bold" align="center">
            {t('save')}
          </AppText>
        </AppButton>
        <View style={styles.innerContainer}>
          <AppButton
            showShadow
            style={styles.btn}
            rightIcon={<GenerateQRCodeIcon stroke={colors.white} />}
            color={colors.secondary}
            onPress={onPressGenerateNewQR}>
            <AppText color={colors.white} weight="bold" align="center">
              {t('generate_new_qr')}
            </AppText>
          </AppButton>
          <AppButton
            showShadow
            style={styles.btn}
            rightIcon={<ShareIcon stroke={colors.white} />}
            onPress={onPressShare}>
            <AppText color={colors.white} weight="bold" align="center">
              {t('share')}
            </AppText>
          </AppButton>
        </View>
      </View>
    </>
  );
};

export default QRGeneratorResultAction;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    gap: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flex: 1,
  },
});
