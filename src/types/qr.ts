export type QRCodeGeneratorReq = {
  content: string;
  logo?: string;
  qrColor: string;
  backgroundColor: string;
  ecLevel?: 'L' | 'M' | 'Q' | 'H' | string;
};
