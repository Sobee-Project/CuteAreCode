import {useLanguageContext} from '@/context/LanguageContext';
import {colors} from '@/theme/color';
import {SUPPORT_LANGUAGES} from '@/utils/constant';
import React, {useEffect, useMemo, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LanguageItem from './components/LanguageItem';

const Language = () => {
  const {selectedLanguage} = useLanguageContext();
  const data = useMemo(() => SUPPORT_LANGUAGES, []);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    const selectedLanguageIndex = SUPPORT_LANGUAGES.findIndex(
      lang => lang.code === selectedLanguage,
    );
    listRef.current?.scrollToIndex({
      animated: true,
      index: selectedLanguageIndex,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      ref={listRef}
      initialNumToRender={SUPPORT_LANGUAGES.length}
      removeClippedSubviews
      onScrollToIndexFailed={({index}) => {
        setTimeout(() => {
          listRef.current?.scrollToIndex({
            animated: true,
            index,
          });
        }, 500);
      }}
      style={{backgroundColor: colors.white}}
      data={data}
      renderItem={({item}) => (
        <LanguageItem
          language={item}
          isSelected={selectedLanguage === item.code}
        />
      )}
      keyExtractor={item => item.code}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default Language;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
  },
});
