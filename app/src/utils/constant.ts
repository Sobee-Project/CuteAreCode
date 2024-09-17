import RNFS from 'react-native-fs';

export const APP_NAME = 'CuteAreCode';
export const APP_DIR = `${RNFS.DownloadDirectoryPath}/${APP_NAME}`;
export const LANGUAGE_STORAGE_KEY = `${APP_NAME}}:language`;

export const SUPPORT_LANGUAGES = [
  {code: 'vi', flag: '🇻🇳', name: 'vietnamese'},
  {code: 'en', flag: '🇺🇸', name: 'english'},
  {code: 'nl', flag: '🇳🇱', name: 'dutch'},
  {code: 'fil', flag: '🇵🇭', name: 'filipino'},
  {code: 'fr', flag: '🇫🇷', name: 'french'},
  {code: 'de', flag: '🇩🇪', name: 'german'},
  {code: 'hi', flag: '🇮🇳', name: 'hindi'},
  {code: 'id', flag: '🇮🇩', name: 'indonesian'},
  {code: 'it', flag: '🇮🇹', name: 'italian'},
  {code: 'ja', flag: '🇯🇵', name: 'japanese'},
  {code: 'ko', flag: '🇰🇷', name: 'korean'},
  {code: 'ms', flag: '🇲🇾', name: 'malay'},
  {code: 'pl', flag: '🇵🇱', name: 'polish'},
  {code: 'pt', flag: '🇵🇹', name: 'portuguese'},
  {code: 'ru', flag: '🇷🇺', name: 'russian'},
  {code: 'es', flag: '🇪🇸', name: 'spanish'},
  {code: 'th', flag: '🇹🇭', name: 'thai'},
  {code: 'tr', flag: '🇹🇷', name: 'turkish'},
  {code: 'zh', flag: '🇨🇳', name: 'chinese'},
];
