import React, { FC, memo } from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import styled from '@emotion/native';

const StyledView = styled.View({
  alignSelf: 'center',
  marginBottom: 32,
});

interface IStyledImage {
  isRounded: boolean;
}

const StyledImage = styled.Image<IStyledImage>(({ theme, isRounded }) => ({
  backgroundColor: theme.color.image.background,
  width: 100,
  height: 100,
  borderRadius: isRounded ? 50 : 0,
}));

interface IImage {
  style?: StyleProp<ImageStyle>;
  isRounded?: boolean;
  uri: string;
}

const Image: FC<IImage> = ({ style, isRounded = false, uri }) => {
  return (
    <StyledView>
      <StyledImage style={style} isRounded={isRounded} source={{ uri }} />
    </StyledView>
  );
};

export default memo(Image);
