import React, { FC, memo } from 'react';
import styled from '@emotion/native';
import { StyleProp, ViewStyle } from 'react-native';

interface IStyled {
  isFilled: boolean;
  disabled?: boolean;
}

const StyledPressable = styled.Pressable<IStyled>(
  ({ theme, isFilled, disabled = false }) => ({
    backgroundColor: isFilled ? theme.color.button.background : 'transparent',
    alignItems: 'center',
    width: '100%',
    padding: 8,
    borderRadius: 4,
    opacity: disabled ? 0.8 : 1,
  })
);

const StyledText = styled.Text<IStyled>(({ theme, isFilled }) => ({
  height: 32,
  lineHeight: 32,
  fontSize: 16,
  color: isFilled ? theme.color.button.title : theme.color.button.background,
}));

interface IButton {
  style?: StyleProp<ViewStyle>;
  isFilled?: boolean;
  title: string;
  disabled?: boolean;
  onPress: () => void;
}

const Button: FC<IButton> = ({
  style,
  isFilled = true,
  title,
  disabled,
  onPress,
}) => {
  return (
    <StyledPressable
      style={style}
      isFilled={isFilled}
      disabled={disabled}
      onPress={onPress}
    >
      <StyledText isFilled={isFilled}>{title}</StyledText>
    </StyledPressable>
  );
};

export default memo(Button);
