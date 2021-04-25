import React, { memo, useMemo } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useTheme } from '@emotion/react';

import { Login, Signup } from '../screens';

const Stack = createStackNavigator();

export default memo(() => {
  const theme = useTheme();

  const screenOptions: StackNavigationOptions = useMemo(
    () => ({
      headerTitleAlign: 'center',
      cardStyle: { backgroundColor: theme.color.background },
    }),
    [theme]
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
});
