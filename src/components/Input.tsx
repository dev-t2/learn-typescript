import React, { forwardRef, memo, useCallback, useState } from 'react';
import { ReturnKeyTypeOptions, TextInput } from 'react-native';
import styled from '@emotion/native';

const StyledView = styled.View({
  flexDirection: 'column',
  width: '100%',
  marginBottom: 16,
});

interface IStyled {
  isFocused: boolean;
}

const StyledText = styled.Text<IStyled>(({ theme, isFocused }) => ({
  fontSize: 12,
  fontWeight: '600',
  color: isFocused ? theme.color.text : theme.color.label,
  marginBottom: 4,
  marginLeft: 4,
}));

const StyledTextInput = styled.TextInput<IStyled>(({ theme, isFocused }) => ({
  backgroundColor: theme.color.background,
  color: theme.color.text,
  paddingHorizontal: 24,
  paddingVertical: 12,
  fontSize: 16,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: isFocused ? theme.color.text : theme.color.input.border,
  borderRadius: 8,
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
