import {AppText} from '@/components/common';
import {CheckIcon} from '@/components/icons';
import {Language, useLanguageContext} from '@/context/LanguageContext';
import {colors} from '@/theme/color';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet} from 'react-native';

type Props = {
  language: Language;
  isSelected?: boolean;
};

const LanguageItem = ({language, isSelected}: Props) => {
  const {t} = useTranslation(['language']);
  const {changeLanguage} = useLanguageContext();
  return (
    <Pressable
      style={styles.container}
      onPress={() => changeLanguage(language.code)}>
      <AppText
        size={16}
        weight="bold"
        color={isSelected ? colors.main : colors.rawBlack}>
        {t(language.flag)}
        {'   '}
        {t(language.name)}
      </AppText>
      {isSelected && <CheckIcon size={24} color={colors.main} />}
    </Pressable>
  );
};

export default memo(LanguageItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
