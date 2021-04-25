import React, { memo, useCallback, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { cacheFonts, cacheImages } from './src/utils/cache';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const startAsync = useCallback(async () => {
    const imageAssets = cacheImages([require('./assets/splash.png')]);
    const fontAssets = cacheFonts([]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }, []);

  const onFinish = useCallback(() => {
    setIsReady(true);
  }, []);

  return isReady ? (
    <View>
      <StatusBar style="dark" />
    </View>
  ) : (
    <AppLoading
      startAsync={startAsync}
      onFinish={onFinish}
      onError={console.error}
    />
  );
};

export default memo(App);
