import {useMutation} from '@tanstack/react-query';
import {GenerateQRCodeRequestDto} from './qrcode.dto';
import {qrCodeService} from './qrcode.service';

export const useGenerateQRCodeMutation = () => {
  return useMutation({
    mutationFn: async (body: GenerateQRCodeRequestDto) => {
      const res = await qrCodeService.generate(body);
      return res.data;
    },
  });
};

export const useReadQRCodeFromImageMutation = () => {
  return useMutation({
    mutationFn: async (body: {qrCode: string}) => {
      const res = await qrCodeService.readFromImage(body);
      return res.data;
    },
  });
};
