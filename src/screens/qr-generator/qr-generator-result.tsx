import {QRGeneratorStackScreenProps} from '@/types/navigation';
import {WIDTH} from '@/utils/responsive';
import React from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import QRGeneratorResultAction from './components/QRGeneratorResultAction';

const QrGeneratorResult = ({
  route,
}: QRGeneratorStackScreenProps<'QRGeneratorResult'>) => {
  const {
    params: {data, onReset},
  } = route;
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <Image
          source={{uri: data.qrCodeImage}}
          style={styles.qr}
          resizeMode="contain"
        />
        <QRGeneratorResultAction data={data} onReset={onReset} />
      </View>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
    </View>
  );
};

export default QrGeneratorResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  qrContainer: {
    flex: 1,
  },
  qr: {
    width: WIDTH - 40,
    height: WIDTH - 40,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
