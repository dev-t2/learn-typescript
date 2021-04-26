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
      headerTintColor: theme.color.header.Tint,
    }),
    [theme]
  );

  const loginOptions: StackNavigationOptions = useMemo(
    () => ({ headerShown: false }),
    []
  );

  const signupOptions: StackNavigationOptions = useMemo(
    () => ({ headerBackTitleVisible: false }),
    []
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={Login} options={loginOptions} />
      <Stack.Screen name="Signup" component={Signup} options={signupOptions} />
    </Stack.Navigator>
  );
});
