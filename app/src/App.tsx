import {LanguageProvider} from '@/context/LanguageContext';
import ApplicationNavigator from '@/navigations/application';
import '@/translations';
import {APP_DIR} from '@/utils/constant';
import {FileUtils} from '@/utils/rnfs';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    FileUtils.makeDir(APP_DIR);
  }, []);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Host>
          <QueryClientProvider client={queryClient}>
            <LanguageProvider>
              <ApplicationNavigator />
            </LanguageProvider>
          </QueryClientProvider>
        </Host>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
