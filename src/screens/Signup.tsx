import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from '@emotion/native';

import { Button, Image, Input } from '../components';
import image from '../utils/image';
import { removeWhiteSpace, validateEmail } from '../utils/common';
import { signup } from '../utils/firebase';

const StyledSafeAreaView = styled.SafeAreaView(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.background,
  paddingVertical: 40,
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

const Signup = () => {
  const [uri, setUri] = useState(image.photo);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);

  const didMountRef = useRef(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const passwordCheckRef = useRef<TextInput>(null);

  useEffect(() => {
    if (didMountRef.current) {
      let error = '';

      if (!name) {
        error = '이름을 입력해주세요.';
      } else if (!validateEmail(email)) {
        error = '이메일을 확인해주세요.';
      } else if (password.length < 6) {
        error = '비밀번호는 6자리 이상이어야 합니다.';
      } else if (password !== passwordCheck) {
        error = '비밀번호가 일치해야 합니다.';
      } else {
        error = '';
      }

      setError(error);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordCheck]);

  useEffect(() => {
    setDisabled(!(name && email && password && passwordCheck && !error));
  }, [name, email, password, passwordCheck, error]);

  const onChangeImage = useCallback(uri => {
    setUri(uri);
  }, []);

  const onChangeName = useCallback(text => {
    setName(text);
  }, []);

  const onSubmitName = useCallback(() => {
    setName(name.trim());

    emailRef.current?.focus();
  }, [name]);

  const onChangeEmail = useCallback(text => {
    setEmail(removeWhiteSpace(text));
  }, []);

  const onSubmitEmail = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onChangePassword = useCallback(text => {
    setPassword(removeWhiteSpace(text));
  }, []);

  const onSubmitPassword = useCallback(() => {
    passwordCheckRef.current?.focus();
  }, []);

  const onChangePasswordCheck = useCallback(text => {
    setPasswordCheck(removeWhiteSpace(text));
  }, []);

  const onPress = useCallback(async () => {
    try {
      const user = await signup({ email, password });

      Alert.alert('회원가입 완료');
    } catch (e) {
      Alert.alert('회원가입 실패', e.message);
    }
  }, [email, password]);

  return (
    <KeyboardAwareScrollView>
      <StyledSafeAreaView>
        <Image isRounded isShowButton uri={uri} onChangeImage={onChangeImage} />

        <Input
          label="이름"
          value={name}
          placeholder="이름을 입력하세요."
          returnKeyType="next"
          onChangeText={onChangeName}
          onSubmitEditing={onSubmitName}
        />

        <Input
          ref={emailRef}
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
          value={password}
          isPassword
          placeholder="비밀번호를 입력하세요."
          returnKeyType="next"
          onChangeText={onChangePassword}
          onSubmitEditing={onSubmitPassword}
        />

        <Input
          ref={passwordCheckRef}
          label="비밀번호 확인"
          value={passwordCheck}
          isPassword
          placeholder="비밀번호를 다시 입력하세요."
          returnKeyType="done"
          onChangeText={onChangePasswordCheck}
          onSubmitEditing={onPress}
        />

        <StyledText>{error}</StyledText>

        <Button title="회원가입" disabled={disabled} onPress={onPress} />
      </StyledSafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default memo(Signup);
