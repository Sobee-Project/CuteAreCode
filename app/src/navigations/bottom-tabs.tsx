import {AppText} from '@/components/common';
import {GenerateQRCodeIcon, ScanQRCodeIcon} from '@/components/icons';
import {colors} from '@/theme/color';
import {ApplicationBottomTabsParamList} from '@/types/navigation';
import {BOTTOM_TAB_HEIGHT, s} from '@/utils/responsive';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ColorValue, Pressable, StyleSheet, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {QRGeneratorStack} from './qr-generator.stack';
import {QRScannerStack} from './qr-scanner.stack';

const navigator = [
  {
    name: 'ScanQRCode',
    label: 'scan_qr_code',
    icon: ScanQRCodeIcon,
    component: QRScannerStack,
    color: colors.main,
  },
  {
    name: 'GenerateQRCode',
    label: 'generate_qr_code',
    icon: GenerateQRCodeIcon,
    component: QRGeneratorStack,
    color: colors.main,
  },
] as {
  label: string;
  name: keyof ApplicationBottomTabsParamList;
  icon: (props: SvgProps) => JSX.Element;
  component: React.FC;
  color: ColorValue;
}[];

const Tab = createBottomTabNavigator<ApplicationBottomTabsParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="ScanQRCode"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      {navigator.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
};

function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label = navigator[index].label;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const item = navigator[index];
        const Icon = item.icon;

        return (
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={styles.tab}>
            <Icon stroke={isFocused ? item.color : colors.gray} size={s(30)} />
            <AppText
              size={14}
              color={isFocused ? item.color : colors.gray}
              weight="regular">
              {t(label)}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: BOTTOM_TAB_HEIGHT,
    alignSelf: 'center',
    gap: 4,
    backgroundColor: colors.white,
    elevation: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});
