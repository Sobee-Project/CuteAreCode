import {AppButton, AppText} from '@/components/common';
import {
  ChevronLeftIcon,
  CopyToClipboardIcon,
  ExternalLinkIcon,
} from '@/components/icons';
import ScanQRCodeICon from '@/components/icons/ScanQRCodeIcon';
import {colors} from '@/theme/color';
import {QRScannerStackNavigationProps} from '@/types/navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {BackHandler, StyleSheet, View} from 'react-native';
import {Portal} from 'react-native-portalize';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

type Props = {
  data: string;
};

const QRScannerResultAction = ({data}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation<QRScannerStackNavigationProps>();
  const [copied, setCopied] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const isLoaded = loadProgress === 1;

  const isUrl = data.startsWith('http') || data.startsWith('https');

  const onPressScanNewQR = () => {
    navigation.goBack();
  };

  const onPressCopyToClipboard = () => {
    Clipboard.setString(data);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const onPressOpen = () => {
    setShowWebView(true);
  };

  const onPressCloseWebView = () => {
    setShowWebView(false);
  };

  useEffect(() => {
    const onBackPress = () => {
      if (showWebView) {
        setShowWebView(false);
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [showWebView]);

  return (
    <>
      <View style={styles.container}>
        {isUrl && (
          <AppButton
            showShadow
            variant="outline"
            rightIcon={<ExternalLinkIcon stroke={colors.main} />}
            onPress={onPressOpen}>
            <AppText color={colors.main} weight="bold" align="center">
              {t('open')}
            </AppText>
          </AppButton>
        )}
        <View style={styles.innerContainer}>
          <AppButton
            showShadow
            style={styles.btn}
            rightIcon={<ScanQRCodeICon stroke={colors.white} />}
            color={colors.secondary}
            onPress={onPressScanNewQR}>
            <AppText color={colors.white} weight="bold" align="center">
              {t('scan_new_qr')}
            </AppText>
          </AppButton>
          <AppButton
            showShadow
            style={styles.btn}
            rightIcon={<CopyToClipboardIcon stroke={colors.white} />}
            color={copied ? colors.success : colors.main}
            onPress={onPressCopyToClipboard}>
            <AppText color={colors.white} weight="bold" align="center">
              {copied ? t('copied') : t('copy')}
            </AppText>
          </AppButton>
        </View>
      </View>

      {showWebView && (
        <Portal>
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.webviewControl}>
              <AppButton
                variant="clear"
                style={{
                  padding: 0,
                }}
                onPress={onPressCloseWebView}
                leftIcon={<ChevronLeftIcon size={30} color={colors.main} />}>
                <AppText
                  color={colors.main}
                  weight="bold"
                  size={16}
                  style={{flex: 1}}>
                  {t('back')}
                </AppText>
              </AppButton>
              {!isLoaded && (
                <View
                  style={[
                    {
                      width: `${loadProgress * 100}%`,
                    },
                    styles.progressBar,
                  ]}
                />
              )}
            </View>
            <WebView
              source={{uri: data}}
              style={styles.webview}
              onLoadProgress={({nativeEvent}) => {
                setLoadProgress(nativeEvent.progress);
              }}
              onError={error => {
                console.log('error', error);
              }}
              onHttpError={error => {
                console.log('http error', error);
              }}
              menuItems={[
                {
                  key: 'openInBrowser',
                  label: 'Open in browser',
                },
              ]}
            />
          </SafeAreaView>
        </Portal>
      )}
    </>
  );
};

export default QRScannerResultAction;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  webviewControl: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  progressBar: {
    height: 2,
    backgroundColor: colors.main,
    position: 'absolute',
    bottom: 0,
  },
});
