import React, { memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

const App = () => {
  return (
    <View>
      <StatusBar style="dark" />
    </View>
  );
};

export default memo(App);
