import React, { memo } from 'react';
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

const Signup = () => {
  return (
    <StyledView>
      <StyledText>Signup Screen</StyledText>
    </StyledView>
  );
};

export default memo(Signup);
