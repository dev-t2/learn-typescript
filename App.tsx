import React, { memo, useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from '@emotion/react';

import Navigation from './src/navigations';
import { cacheFonts, cacheImages } from './src/utils/cache';
import image from './src/utils/image';
import theme from './src/theme';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const startAsync = useCallback(async () => {
    const imageAssets = cacheImages([
      require('./assets/splash.png'),
      ...Object.values(image),
    ]);
    const fontAssets = cacheFonts([]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }, []);

  const onFinish = useCallback(() => {
    setIsReady(true);
  }, []);

  return isReady ? (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" />

      <Navigation />
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={startAsync}
      onFinish={onFinish}
      onError={console.error}
    />
  );
};

export default memo(App);
