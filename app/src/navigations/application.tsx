import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';

import {ChevronLeftIcon} from '@/components/icons';
import {Language, Settings} from '@/screens';
import {colors} from '@/theme/color';
import {families} from '@/theme/font';
import type {ApplicationStackParamList} from '@/types/navigation';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Pressable} from 'react-native';
import BottomTabs from './bottom-tabs';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const initialRouteName = 'Main' as keyof ApplicationStackParamList;
  const {t} = useTranslation();
  return (
    <NavigationContainer fallback={<ActivityIndicator animating />}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          headerLeftLabelVisible: false,
          headerTitleStyle: {
            fontFamily: families.bold,
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.main,
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
        }}
        initialRouteName={initialRouteName}>
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            title: t('settings'),
          }}
        />

        <Stack.Screen
          name="Language"
          component={Language}
          options={{
            headerShown: true,
            title: t('choose') + ' ' + t('language'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
