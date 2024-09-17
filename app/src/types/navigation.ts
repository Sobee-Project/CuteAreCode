import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigationProp} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';

export type QRGeneratorStackParamList = {
  QRGenerator: undefined;
  QRGeneratorResult: {data: string; onReset: () => void};
  Settings: undefined;
};

export type QRGeneratorStackScreenProps<
  T extends keyof QRGeneratorStackParamList,
> = StackScreenProps<QRGeneratorStackParamList, T>;
export type QRGeneratorStackNavigationProps =
  NavigationProp<QRGeneratorStackParamList>;

export type QRScannerStackParamList = {
  QRScanner: undefined;
  QRScannerResult: {
    data: string;
  };
  Settings: undefined;
};

export type QRScannerStackScreenProps<T extends keyof QRScannerStackParamList> =
  StackScreenProps<QRScannerStackParamList, T>;
export type QRScannerStackNavigationProps =
  NavigationProp<QRScannerStackParamList>;

export type ApplicationBottomTabsParamList = {
  ScanQRCode: undefined;
  GenerateQRCode: undefined;
};

export type ApplicationBottomTabsScreenProps<
  T extends keyof ApplicationBottomTabsParamList,
> = BottomTabScreenProps<ApplicationBottomTabsParamList, T>;
export type ApplicationBottomTabsNavigationProps =
  NavigationProp<ApplicationBottomTabsParamList>;

export type ApplicationStackParamList = {
  Main: undefined;
  Settings: undefined;
  Language: undefined;
};

export type ApplicationStackScreenProps<
  T extends keyof ApplicationStackParamList,
> = StackScreenProps<ApplicationStackParamList, T>;
export type ApplicationStackNavigationProps =
  NavigationProp<ApplicationStackParamList>;
