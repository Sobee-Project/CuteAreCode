import {LanguageProvider} from '@/context/LanguageContext';
import ApplicationNavigator from '@/navigations/application';
import '@/translations';
import {APP_DIR} from '@/utils/constant';
import {FileUtils} from '@/utils/rnfs';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    FileUtils.makeDir(APP_DIR);
  }, []);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Host>
          <LanguageProvider>
            <ApplicationNavigator />
          </LanguageProvider>
        </Host>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
