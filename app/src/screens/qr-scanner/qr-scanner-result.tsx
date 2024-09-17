import {AppText} from '@/components/common';
import {colors} from '@/theme/color';
import {QRScannerStackScreenProps} from '@/types/navigation';
import React, {useMemo} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import QRScannerResultAction from './components/QRScannerResultAction';

const QrScannerResult = ({
  route,
}: QRScannerStackScreenProps<'QRScannerResult'>) => {
  const {
    params: {data},
  } = route;

  const fontSizeConfig = useMemo(
    () =>
      ({
        0: 20,
        100: 18,
        200: 16,
        300: 14,
      }) as Record<string, number>,
    [],
  );

  const fontSize = useMemo(
    () =>
      Object.keys(fontSizeConfig).reduce((acc, key) => {
        if (data.length >= parseInt(key, 10)) {
          return fontSizeConfig[key];
        }
        return acc;
      }, 12),
    [fontSizeConfig, data.length],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.content}>
        <AppText
          size={fontSize}
          weight="bold"
          selectable
          selectionColor={colors.main}>
          {data}
        </AppText>
      </ScrollView>
      <QRScannerResultAction data={data} />
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />
    </View>
  );
};

export default QrScannerResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  content: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
});
