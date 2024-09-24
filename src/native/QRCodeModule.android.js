import {NativeModules} from 'react-native';
const {QRCodeModule} = NativeModules;

export const generateQRCode = (
  content,
  width,
  height,
  qrColor = '#000000', // Default QR color is black
  backgroundColor = '#FFFFFF', // Default background color is white
  errorCorrection = 'M', // Default error correction level is 'M'
  logoBase64, // Optional logo in Base64 format
) => {
  return new Promise((resolve, reject) => {
    QRCodeModule.generateQRCode(
      content,
      width,
      height,
      qrColor,
      backgroundColor,
      errorCorrection,
      logoBase64,
      (error, qrCode) => {
        if (error) {
          reject(error);
        } else {
          resolve(qrCode);
        }
      },
    );
  });
};

export const readQRCode = encodedImage => {
  return new Promise((resolve, reject) => {
    QRCodeModule.readQRCodeFromBitmap(encodedImage, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
