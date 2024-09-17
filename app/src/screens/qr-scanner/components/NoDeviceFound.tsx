import {AppText} from '@/components/common';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

const NoDeviceFound = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <AppText size={20} weight="semiBold" align="center">
        {t('no_camera_found')}
      </AppText>
    </View>
  );
};

export default NoDeviceFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
