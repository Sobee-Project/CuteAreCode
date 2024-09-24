import {AppText} from '@/components/common';
import {ChevronLeftIcon, LanguageIcon} from '@/components/icons';
import {Language, useLanguageContext} from '@/context/LanguageContext';
import {colors} from '@/theme/color';
import {ApplicationStackScreenProps} from '@/types/navigation';
import {SUPPORT_LANGUAGES} from '@/utils/constant';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import * as app from '~/app.json';
import SettingItem from './components/SettingItem';

const Settings = ({navigation}: ApplicationStackScreenProps<'Settings'>) => {
  const {t} = useTranslation();
  const {selectedLanguage} = useLanguageContext();

  const selectedLanguageObj = useMemo(
    () => SUPPORT_LANGUAGES.find(item => item.code === selectedLanguage),
    [selectedLanguage],
  ) as Language;

  const onPressLanguage = () => {
    navigation.navigate('Language');
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <SettingItem
          icon={<LanguageIcon stroke={colors.black} />}
          title={t('language')}
          onPress={onPressLanguage}
          right={
            <View style={styles.language}>
              <AppText>
                {t(selectedLanguageObj.name, {
                  ns: 'language',
                })}
              </AppText>
              <ChevronLeftIcon
                style={{transform: [{rotate: '180deg'}]}}
                stroke={colors.black}
              />
            </View>
          }
        />
      </ScrollView>
      <Image
        source={require('@/assets/illustrations/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <AppText align="center" weight="bold" style={styles.version}>
        {t('version')} {app.version}
      </AppText>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  language: {
    flexDirection: 'row',
    gap: 8,
  },
  logo: {
    width: 200,
    height: 200,
    opacity: 0.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    alignSelf: 'center',
  },
  version: {
    padding: 20,
  },
});
