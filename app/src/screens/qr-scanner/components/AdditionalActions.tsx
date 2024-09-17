import {AppText} from '@/components/common';
import {CogIcon} from '@/components/icons';
import {colors} from '@/theme/color';
import {QRScannerStackNavigationProps} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  tintColor?: string;
  isHeader?: boolean;
};

const AdditionalActions = ({
  tintColor = colors.white,
  isHeader = false,
}: Props) => {
  const navigation = useNavigation<QRScannerStackNavigationProps>();
  const {t} = useTranslation();

  const onPressSettings = () => {
    navigation.navigate('Settings');
  };

  const Wrapper = isHeader ? View : SafeAreaView;

  return (
    <>
      <Wrapper
        style={[
          styles.container,
          {
            justifyContent: isHeader ? 'flex-end' : 'space-between',
          },
        ]}>
        {!isHeader && (
          <AppText weight="bold" size={20} color={tintColor}>
            {t('app_name')}
          </AppText>
        )}
        <Pressable onPress={onPressSettings} hitSlop={20}>
          <CogIcon stroke={tintColor} size={30} />
        </Pressable>
      </Wrapper>
    </>
  );
};

export default AdditionalActions;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    left: 20,
    top: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
});
