import RNBlobUtil from 'react-native-blob-util';
import RNFS from 'react-native-fs';

export const FileUtils = {
  makeDir: async (dir: string) => {
    const exists = await RNFS.exists(dir);
    if (!exists) {
      try {
        await RNFS.mkdir(dir);
        return true;
      } catch (e) {
        console.log('mkdir error', e);
        return false;
      }
    } else {
      console.log('dir exists');
      return true;
    }
  },
  writeImageFile: async (path: string, data: string) => {
    try {
      const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
      await RNFS.writeFile(path, base64Data, 'base64');
      RNBlobUtil.fs
        .scanFile([{path, mime: 'image/png'}])
        .then(() => {
          console.log('File scanned and added to gallery');
        })
        .catch(err => {
          console.log('Error scanning file:', err);
        });

      return path;
    } catch (e) {
      console.log('writeFile error', e);
    }
  },
  unlinkMany: async (files: string[]) => {
    for (const file of files) {
      try {
        await RNFS.unlink(file);
      } catch (e) {
        console.log('unlink error', e);
      }
    }
  },
  unlinkOne: async (file: string) => {
    try {
      await RNFS.unlink(file);
    } catch (e) {
      console.log('unlink error', e);
    }
  },
};
