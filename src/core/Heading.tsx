import React, {ComponentProps, FunctionComponent} from 'react';
import {Text} from 'react-native';

import COLORS from '../constants/colors';

const variants = ['md', 'sm', 'lg'] as const;

type TextVariant = (typeof variants)[number];

type TextProps = {variant?: TextVariant} & ComponentProps<typeof Text>;

const Heading: FunctionComponent<TextProps> = ({variant = 'md', ...rest}) => (
  <Text {...rest} style={[styles[variant], rest.style]} />
);

const styles: Record<TextVariant, any> = {
  sm: {
    fontWeight: '500',
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'left',
  },
  md: {
    fontWeight: '500',
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'left',
  },
  lg: {
    fontWeight: '600',
    color: COLORS.white,
    fontSize: 25,
    textAlign: 'left',
  },
};

export default Heading;
