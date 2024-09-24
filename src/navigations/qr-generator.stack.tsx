import {ChevronLeftIcon, CogIcon} from '@/components/icons';
import {QrGenerator, QrGeneratorResult} from '@/screens';
import {colors} from '@/theme/color';
import {families} from '@/theme/font';
import {
  QRGeneratorStackParamList,
  QRGeneratorStackScreenProps,
} from '@/types/navigation';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable} from 'react-native';

const Stack = createStackNavigator<QRGeneratorStackParamList>();

export const QRGeneratorStack = ({
  navigation,
}: QRGeneratorStackScreenProps<'QRGenerator'>) => {
  const {t} = useTranslation();

  const onPressSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <Stack.Navigator
      initialRouteName="QRGenerator"
      screenOptions={{
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
      <Stack.Screen
        name="QRGenerator"
        component={QrGenerator}
        options={{
          title: t('generate_qr_code'),
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="QRGeneratorResult"
        component={QrGeneratorResult}
        options={{
          headerShown: true,
          title: t('qr_code_result'),
        }}
      />
    </Stack.Navigator>
  );
};
