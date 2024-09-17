import {ChevronLeftIcon, CogIcon} from '@/components/icons';
import {CameraProvider} from '@/context/CameraContext';
import {QrScanner, QrScannerResult} from '@/screens';
import {colors} from '@/theme/color';
import {families} from '@/theme/font';
import {
  QRScannerStackParamList,
  QRScannerStackScreenProps,
} from '@/types/navigation';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable} from 'react-native';

const Stack = createStackNavigator<QRScannerStackParamList>();

export const QRScannerStack = ({
  navigation,
}: QRScannerStackScreenProps<'QRScanner'>) => {
  const {t} = useTranslation();
  const onPressSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <CameraProvider>
      <Stack.Navigator
        initialRouteName="QRScanner"
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: families.bold,
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.main,
          headerRight: ({tintColor}) => (
            <Pressable
              onPress={onPressSettings}
              hitSlop={20}
              style={{
                marginRight: 20,
              }}>
              <CogIcon stroke={tintColor} size={30} />
            </Pressable>
          ),
          headerLeft: ({tintColor, canGoBack, onPress}) =>
            canGoBack && (
              <Pressable
                onPress={onPress}
                hitSlop={20}
                style={{
                  marginLeft: 20,
                }}>
                <ChevronLeftIcon stroke={tintColor} size={30} />
              </Pressable>
            ),
        }}>
        <Stack.Screen name="QRScanner" component={QrScanner} />
        <Stack.Screen
          name="QRScannerResult"
          component={QrScannerResult}
          options={{
            headerShown: true,
            title: t('qr_code_result'),
          }}
        />
      </Stack.Navigator>
    </CameraProvider>
  );
};
