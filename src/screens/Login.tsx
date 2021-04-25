import React, { memo, useCallback, useState } from 'react';

import styled from '@emotion/native';

import { Image, Input } from '../components';
import image from '../utils/image';

const StyledView = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.background,
  padding: 18,
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);

  const onSubmitEmail = useCallback(() => {}, []);

  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);

  return (
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

      <Input
        label="비밀번호"
        isPassword
        value={password}
        placeholder="비밀번호를 입력하세요."
        returnKeyType="done"
        onChangeText={onChangePassword}
      />
    </StyledView>
  );
};

export default memo(Login);
