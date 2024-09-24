import {AppButton, AppText, AppTextInput} from '@/components/common';
import {XIcon} from '@/components/icons';
import {generateQRCode, readQRCode} from '@/native/QRCodeModule.android';
import {colors} from '@/theme/color';
import {families} from '@/theme/font';
import {QRGeneratorStackScreenProps} from '@/types/navigation';
import {QRCodeGeneratorReq} from '@/types/qr';
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
import RadioButtonsGroup, {
  RadioButtonProps,
} from 'react-native-radio-buttons-group';
import ColorPicker from 'react-native-wheel-color-picker';

const QrGenerator = ({
  navigation,
}: QRGeneratorStackScreenProps<'QRGenerator'>) => {
  const initialQrCodeReq: QRCodeGeneratorReq = {
    content: '',
    qrColor: colors.rawBlack,
    backgroundColor: colors.white,
    logo: '',
    ecLevel: 'M',
  };

  const {t} = useTranslation();
  const [qrCodeReq, setQrCodeReq] =
    useState<QRCodeGeneratorReq>(initialQrCodeReq);
  const [isLoading, setIsLoading] = useState(false);

  const [showColorPicker, setShowColorPicker] = useState<
    keyof QRCodeGeneratorReq | null
  >(null);
  const inputRef = useRef<TextInput>(null);

  const errorCorrectionLevels: RadioButtonProps[] = [
    {
      id: 'L',
      label: t('ec_low') + ' (L)',
    },
    {
      id: 'M',
      label: t('ec_medium') + ' (M)',
    },
    {
      id: 'Q',
      label: t('ec_quartile') + ' (Q)',
    },
    {
      id: 'H',
      label: t('ec_high') + ' (H)',
    },
  ];

  const onReset = () => {
    setQrCodeReq(initialQrCodeReq);
    inputRef.current?.focus();
  };

  const onChange = (key: keyof QRCodeGeneratorReq, value: string) => {
    setQrCodeReq(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const onShowColorPicker = (variant: keyof QRCodeGeneratorReq) => {
    setShowColorPicker(variant);
  };

  const onChooseLogo = () => {
    ImageCropPicker.openPicker({
      includeBase64: true,
      cropping: true,
      width: 512,
      height: 512,
      cropperCancelText: t('cancel'),
      cropperChooseText: t('choose'),
      mediaType: 'photo',
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

  const onChangeErrorCorrectionLevel = (id: string) => {
    setQrCodeReq(prev => ({
      ...prev,
      ecLevel: id,
    }));
  };

  const onPressGenerateQRCode = async () => {
    const base64LogoOnly = qrCodeReq.logo?.split(',')[1];
    const data = {
      ...qrCodeReq,
      logo: base64LogoOnly,
    };
    console.log('data', data);
    setIsLoading(true);
    try {
      const qrCode = await generateQRCode(
        data.content,
        300,
        300,
        data.qrColor,
        data.backgroundColor,
        data.ecLevel,
        data.logo,
      );

      // Check if QR code is valid and readable
      await readQRCode(qrCode);

      navigation.navigate('QRGeneratorResult', {
        data: {
          ...data,
          qrCodeImage: `data:image/png;base64,${qrCode}`,
        },
        onReset,
      });
    } catch {
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
    } finally {
      setIsLoading(false);
    }
  };

  const hasLogo = !!qrCodeReq.logo;
  const canGenerateQRCode = qrCodeReq.content.length > 0;

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
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        automaticallyAdjustKeyboardInsets>
        <AppTextInput
          ref={inputRef}
          label={t('content')}
          multiline
          numberOfLines={6}
          placeholder={t('input_content_placeholder')}
          style={styles.input}
          onChangeText={value => onChange('content', value)}
          value={qrCodeReq.content}
        />

        <AppButton
          onPress={() => onShowColorPicker('qrColor')}
          color={qrCodeReq.qrColor}>
          <AppText color={invertColor(qrCodeReq.qrColor)} weight="bold">
            {t('change_qr_color')}
          </AppText>
        </AppButton>
        <AppButton
          onPress={() => onShowColorPicker('backgroundColor')}
          color={qrCodeReq.backgroundColor}>
          <AppText weight="bold" color={invertColor(qrCodeReq.backgroundColor)}>
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
                color={qrCodeReq[showColorPicker]}
                onColorChangeComplete={color =>
                  onChange(showColorPicker, color)
                }
              />
            </View>
          </Portal>
        )}

        <View
          style={{
            gap: 8,
          }}>
          <AppText weight="bold">{t('error_correction_level')}</AppText>
          <RadioButtonsGroup
            onPress={onChangeErrorCorrectionLevel}
            radioButtons={errorCorrectionLevels.map(level => {
              const isSelected = level.id === qrCodeReq.ecLevel;
              const selectedColor = isSelected ? colors.main : colors.black;
              return {
                ...level,
                labelStyle: {
                  color: selectedColor,
                  fontFamily: families.medium,
                },
                color: selectedColor,
              };
            })}
            selectedId={qrCodeReq.ecLevel}
            containerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            labelStyle={{
              fontFamily: families.medium,
            }}
          />
        </View>

        <View style={styles.actionContainer}>
          <AppButton
            style={{flex: 2 / 3}}
            onPress={
              isLoading ? () => setIsLoading(false) : onPressGenerateQRCode
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
