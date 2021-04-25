import React, { FC, memo } from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import styled from '@emotion/native';

const StyledView = styled.View({
  alignSelf: 'center',
  marginBottom: 32,
});

const StyledImage = styled.Image(({ theme }) => ({
  backgroundColor: theme.color.image.background,
  width: 100,
  height: 100,
}));

interface IImage {
  style?: StyleProp<ImageStyle>;
  uri: string;
}

const Image: FC<IImage> = ({ style, uri }) => {
  return (
    <StyledView>
      <StyledImage style={style} source={{ uri }} />
    </StyledView>
  );
};

export default memo(Image);
