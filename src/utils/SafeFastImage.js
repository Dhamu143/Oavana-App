import React from 'react';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';

const SafeFastImage = ({
  source,
  style,
  resizeMode = FastImage.resizeMode.contain,
  tintColor,
  fallback = true,
  ...props
}) => {
  const width = style?.width;
  const height = style?.height;

  const isValidSize =
    typeof width === 'number' &&
    typeof height === 'number' &&
    width > 0 &&
    height > 0;

  const isValidSource = source && (source.uri || typeof source === 'number');

  if (!isValidSize || !isValidSource || tintColor) {
    return (
      <Image
        source={source}
        style={[style, tintColor ? {tintColor} : null]}
        resizeMode="contain"
        {...props}
      />
    );
  }

  return (
    <FastImage
      source={source}
      style={style}
      resizeMode={resizeMode}
      {...props}
    />
  );
};

export default SafeFastImage;
