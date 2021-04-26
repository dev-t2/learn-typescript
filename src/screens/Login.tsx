import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { StyleProp, TextInput, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from '@emotion/native';

import { Image, Input } from '../components';
import image from '../utils/image';
import { removeWhiteSpace, validateEmail } from '../utils/common';

const StyledView = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.background,
  padding: 16,
}));

const StyledText = styled.Text(({ theme }) => ({
  alignItems: 'flex-start',
  width: '100%',
  height: 16,
  lineHeight: 16,
  marginBottom: 8,
  color: theme.color.error,
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const passwordRef = useRef<TextInput>(null);

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({ flex: 1 }),
    []
  );

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

  return (
    <KeyboardAwareScrollView contentContainerStyle={contentContainerStyle}>
      <StyledView>
        <Image uri={image.logo} />

        <Input
          label="이메일"
          value={email}
          placeholder="이메일을 입력하세요."
          returnKeyType="next"
          onChangeText={onChangeEmail}
          onSubmitEditing={onSubmitEmail}
        />

        {error !== '' && <StyledText>{error}</StyledText>}

        <Input
          ref={passwordRef}
          label="비밀번호"
          isPassword
          value={password}
          placeholder="비밀번호를 입력하세요."
          returnKeyType="done"
          onChangeText={onChangePassword}
        />
      </StyledView>
    </KeyboardAwareScrollView>
  );
};

export default memo(Login);
