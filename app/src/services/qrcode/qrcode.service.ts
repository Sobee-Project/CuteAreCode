import instance from '../instance';
import {
  GenerateQRCodeRequestDto,
  GenerateQRCodeResponseDto,
  ReadQRCodeFromImageRequestDto,
  ReadQRCodeFromImageResponseDto,
} from './qrcode.dto';

export const qrCodeService = {
  generate: async ({data, logo, color}: GenerateQRCodeRequestDto) => {
    return await instance.post<GenerateQRCodeResponseDto>('/qrcode/generate', {
      data,
      logo,
      color,
    });
  },
  readFromImage: async ({qrCode}: ReadQRCodeFromImageRequestDto) => {
    return await instance.post<ReadQRCodeFromImageResponseDto>('/qrcode/read', {
      qrCode,
    });
  },
};
