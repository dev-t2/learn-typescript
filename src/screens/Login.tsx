import React, { memo, useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from '@emotion/native';

const StyledView = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.background,
}));

const StyledText = styled.Text({
  fontSize: 30,
});

const Login = () => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  return (
    <StyledView>
      <StyledText>Login Screen</StyledText>
      <Pressable onPress={onPress}>
        <Text>Signup</Text>
      </Pressable>
    </StyledView>
  );
};

export default memo(Login);
