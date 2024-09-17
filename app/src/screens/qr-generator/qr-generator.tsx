import {AppButton, AppText, AppTextInput} from '@/components/common';
import {XIcon} from '@/components/icons';
import {
  GenerateQRCodeRequestDto,
  useGenerateQRCodeMutation,
} from '@/services/qrcode';
import {colors} from '@/theme/color';
import {QRGeneratorStackScreenProps} from '@/types/navigation';
import {invertColor} from '@/utils/color';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Portal} from 'react-native-portalize';
import ColorPicker from 'react-native-wheel-color-picker';

const QrGenerator = ({
  navigation,
}: QRGeneratorStackScreenProps<'QRGenerator'>) => {
  const initialQrCodeReq: GenerateQRCodeRequestDto = {
    data: '',
    color: {
      dark: colors.rawBlack,
      light: colors.white,
    },
    logo: '',
  };

  const {t} = useTranslation();
  const [qrCodeReq, setQrCodeReq] =
    useState<GenerateQRCodeRequestDto>(initialQrCodeReq);

  const [showColorPicker, setShowColorPicker] = useState<
    keyof GenerateQRCodeRequestDto['color'] | null
  >(null);
  const inputRef = useRef<TextInput>(null);
  const generateQrCodeMutation = useGenerateQRCodeMutation();

  const onReset = () => {
    setQrCodeReq(initialQrCodeReq);
    inputRef.current?.focus();
  };

  const onChange = (key: keyof GenerateQRCodeRequestDto, value: string) => {
    setQrCodeReq(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const onShowColorPicker = (
    variant: keyof GenerateQRCodeRequestDto['color'],
  ) => {
    setShowColorPicker(variant);
  };

  const onChangeColor = (
    color: string,
    variant: keyof GenerateQRCodeRequestDto['color'],
  ) => {
    setQrCodeReq(prev => ({
      ...prev,
      color: {
        ...prev.color,
        [variant]: color,
      },
    }));
  };

  const onChooseLogo = () => {
    ImageCropPicker.openPicker({
      includeBase64: true,
      cropping: true,
      width: 512,
      height: 512,
      cropperCancelText: t('cancel'),
      cropperChooseText: t('choose'),
    })
      .then(image => {
        setQrCodeReq(prev => ({
          ...prev,
          // @ts-ignore
          logo: `data:${image.mime};base64,${image.data}`,
        }));
      })
      .catch(() => {});
  };

  const onPressGenerateQRCode = () => {
    generateQrCodeMutation.mutate(qrCodeReq, {
      onSuccess: ({qrCode}) => {
        navigation.navigate('QRGeneratorResult', {
          data: qrCode,
          onReset,
        });
      },
      onError: () => {
        Alert.alert(t('error'), t('generate_qr_code_error'), [
          {
            text: t('ok'),
            style: 'cancel',
          },
          {
            text: t('retry'),
            onPress: onPressGenerateQRCode,
          },
        ]);
      },
    });
  };

  const hasLogo = !!qrCodeReq.logo;
  const canGenerateQRCode = qrCodeReq.data.length > 0;
  const isLoading = generateQrCodeMutation.isPending;

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      inputRef.current?.blur();
    });

    Keyboard.addListener('keyboardDidShow', () => {
      inputRef.current?.focus();
    });
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
      Keyboard.removeAllListeners('keyboardDidShow');
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        inputRef.current?.blur();
      }}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <AppTextInput
          ref={inputRef}
          label={t('content')}
          multiline
          numberOfLines={6}
          placeholder={t('input_content_placeholder')}
          style={styles.input}
          onChangeText={value => onChange('data', value)}
          value={qrCodeReq.data}
        />

        <AppButton
          onPress={() => onShowColorPicker('dark')}
          color={qrCodeReq.color.dark}>
          <AppText color={invertColor(qrCodeReq.color.dark)} weight="bold">
            {t('change_qr_color')}
          </AppText>
        </AppButton>
        <AppButton
          onPress={() => onShowColorPicker('light')}
          color={qrCodeReq.color.light}>
          <AppText weight="bold" color={invertColor(qrCodeReq.color.light)}>
            {t('change_qr_background')}
          </AppText>
        </AppButton>

        <AppButton onPress={onChooseLogo} color={colors.white}>
          <AppText weight="bold">
            {hasLogo ? t('change_logo') : t('choose_logo')}
          </AppText>
        </AppButton>

        {hasLogo && (
          <Image
            source={{uri: qrCodeReq.logo}}
            style={styles.logo}
            resizeMode="contain"
          />
        )}

        {showColorPicker !== null && (
          <Portal>
            <View style={styles.colorPickerContainer}>
              <Pressable
                style={styles.closeBtn}
                onPress={() => setShowColorPicker(null)}>
                <XIcon stroke={colors.black} size={30} />
              </Pressable>
              <ColorPicker
                color={qrCodeReq.color[showColorPicker]}
                onColorChangeComplete={color =>
                  onChangeColor(color, showColorPicker)
                }
              />
            </View>
          </Portal>
        )}

        <View style={styles.actionContainer}>
          <AppButton
            style={{flex: 2 / 3}}
            onPress={
              isLoading ? generateQrCodeMutation.reset : onPressGenerateQRCode
            }
            isLoading={isLoading}
            isDisabled={!canGenerateQRCode}>
            <AppText color={colors.white} weight="bold">
              {isLoading ? t('cancel') : t('generate_qr_code')}
            </AppText>
          </AppButton>
          <AppButton
            style={{flex: 1 / 3}}
            variant="clear"
            onPress={onReset}
            isDisabled={isLoading}>
            <AppText weight="bold">{t('reset')}</AppText>
          </AppButton>
        </View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default QrGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  input: {
    textAlignVertical: 'top',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  colorPickerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    right: 20,
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 100,
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
});
