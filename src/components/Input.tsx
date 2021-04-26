import React, { forwardRef, memo, useCallback, useState } from 'react';
import { ReturnKeyTypeOptions, TextInput } from 'react-native';
import styled from '@emotion/native';

const StyledView = styled.View({
  flexDirection: 'column',
  width: '100%',
  marginVertical: 16,
});

interface IStyled {
  isFocused: boolean;
}

const StyledText = styled.Text<IStyled>(({ theme, isFocused }) => ({
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 8,
  color: isFocused ? theme.color.text : theme.color.label,
}));

const StyledTextInput = styled.TextInput<IStyled>(({ theme, isFocused }) => ({
  backgroundColor: theme.color.background,
  color: theme.color.text,
  padding: 16,
  fontSize: 16,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: isFocused ? theme.color.text : theme.color.input.border,
  borderRadius: 4,
}));

interface IInput {
  label: string;
  value: string;
  placeholder: string;
  isPassword?: boolean;
  returnKeyType: ReturnKeyTypeOptions;
  maxLength?: number;
  onBlur?: () => void;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
}

const Input = forwardRef<TextInput, IInput>(
  (
    {
      label,
      value,
      placeholder,
      isPassword = false,
      returnKeyType,
      maxLength = 30,
      onBlur = () => {},
      onChangeText,
      onSubmitEditing = () => {},
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const onBlurInput = useCallback(() => {
      setIsFocused(false);

      onBlur();
    }, [onBlur]);

    return (
      <StyledView>
        <StyledText isFocused={isFocused}>{label}</StyledText>

        <StyledTextInput
          ref={ref}
          isFocused={isFocused}
          value={value}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          underlineColorAndroid="transparent"
          onFocus={onFocus}
          onBlur={onBlurInput}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </StyledView>
    );
  }
);

export default memo(Input);
