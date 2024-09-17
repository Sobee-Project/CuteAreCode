export type GenerateQRCodeRequestDto = {
  data: string;
  logo?: string;
  color: {
    dark: string;
    light: string;
  };
};

export type GenerateQRCodeResponseDto = {
  qrCode: string;
};

export type ReadQRCodeFromImageRequestDto = {
  qrCode: string;
};

export type ReadQRCodeFromImageResponseDto = {
  data: string;
};
