import React, { FC, memo, useCallback, useEffect } from 'react';
import { Alert, ImageStyle, Platform, StyleProp } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import styled from '@emotion/native';

const StyledPressable = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.color.image.button,
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 32,
  height: 32,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledIcon = styled(MaterialIcons)(({ theme }) => ({
  color: theme.color.image.icon,
}));

interface IPhotoButton {
  onPress: () => void;
}

const PhotoButton: FC<IPhotoButton> = ({ onPress }) => {
  return (
    <StyledPressable onPress={onPress}>
      <StyledIcon name="photo-camera" size={24} />
    </StyledPressable>
  );
};

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
  isShowButton?: boolean;
  uri: string;
  onChangeImage?: (uri: string) => void;
}

const Image: FC<IImage> = ({
  style,
  isRounded = false,
  isShowButton = false,
  uri,
  onChangeImage = () => {},
}) => {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === 'ios') {
          const { status } = await MediaLibrary.requestPermissionsAsync();

          if (status !== 'granted') {
            Alert.alert('Photo Permission', 'Please turn on the permissions.');
          }
        }
      } catch (e) {
        Alert.alert('Photo Permission Error', e.message);
      }
    })();
  }, []);

  const onPress = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    }
  }, [onChangeImage]);

  return (
    <StyledView>
      <StyledImage style={style} isRounded={isRounded} source={{ uri }} />

      {isShowButton && <PhotoButton onPress={onPress} />}
    </StyledView>
  );
};

export default memo(Image);
