import React, {ComponentProps, FunctionComponent} from 'react';
import {ActivityIndicator} from 'react-native';

import COLORS from '../constants/colors';

type Props = ComponentProps<typeof ActivityIndicator>;

const LoadingIndicator: FunctionComponent<Props> = ({
  size = 'large',
  color = COLORS.teal,
  ...rest
}) => {
  return <ActivityIndicator color={color} size={size} {...rest} />;
};

export default LoadingIndicator;
