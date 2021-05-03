import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, StyleProp, TextInput, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import styled from '@emotion/native';

import { Button, Image, Input } from '../components';
import image from '../utils/image';
import { removeWhiteSpace, validateEmail } from '../utils/common';
import { login } from '../utils/firebase';

const StyledSafeAreaView = styled.SafeAreaView(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.background,
  paddingVertical: 0,
  paddingHorizontal: 24,
}));

const StyledText = styled.Text(({ theme }) => ({
  alignItems: 'flex-start',
  width: '100%',
  height: 16,
  lineHeight: 16,
  color: theme.color.error,
  marginLeft: 8,
  marginBottom: 24,
}));

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);

  const passwordRef = useRef<TextInput>(null);

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({ flex: 1 }),
    []
  );

  useEffect(() => {
    setDisabled(!(email && password && !error));
  }, [email, password, error]);

  const onSubmitEmail = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onChangeEmail = useCallback(text => {
    const withoutSpaceEmail = removeWhiteSpace(text);
    const validatedEmail = validateEmail(withoutSpaceEmail);

    setEmail(withoutSpaceEmail);
    setError(validatedEmail ? '' : '이메일을 확인해주세요.');
  }, []);

  const onChangePassword = useCallback(text => {
    const withoutSpacePassword = removeWhiteSpace(text);
    setPassword(withoutSpacePassword);
  }, []);

  const onPressLogin = useCallback(async () => {
    try {
      const user = await login({ email, password });

      if (user?.email) {
        Alert.alert('Login Success', user.email);
      }
    } catch (e) {
      Alert.alert('Login Error');
    }
  }, [email, password]);

  const onPressSignup = useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={contentContainerStyle}>
      <StyledSafeAreaView>
        <Image uri={image.logo} />

        <Input
          label="이메일"
          value={email}
          placeholder="이메일을 입력하세요."
          returnKeyType="next"
          onChangeText={onChangeEmail}
          onSubmitEditing={onSubmitEmail}
        />

        <Input
          ref={passwordRef}
          label="비밀번호"
          isPassword
          value={password}
          placeholder="비밀번호를 입력하세요."
          returnKeyType="done"
          onChangeText={onChangePassword}
        />

        <StyledText>{error}</StyledText>

        <Button title="로그인" disabled={disabled} onPress={onPressLogin} />
        <Button title="회원가입" isFilled={false} onPress={onPressSignup} />
      </StyledSafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default memo(Login);
