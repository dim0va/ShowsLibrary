import React, {ComponentProps, FunctionComponent} from 'react';
import {Image, StyleSheet} from 'react-native';

import COLORS from '../constants/colors';

type Props = {
  imageUrl?: string;
} & ComponentProps<typeof Image>;

const ShowImage: FunctionComponent<Props> = ({imageUrl, ...rest}) => {
  return (
    <Image
      style={styles.image}
      {...rest}
      source={
        imageUrl
          ? {uri: imageUrl}
          : require('../assets/default-fallback-image.png')
      }
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    backgroundColor: COLORS.cream,
    width: 'auto',
    height: 'auto',
    resizeMode: 'contain',
    aspectRatio: 1.7,
  },
});

export default ShowImage;
