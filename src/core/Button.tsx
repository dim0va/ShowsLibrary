import React, {FunctionComponent} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';

import COLORS from '../constants/colors';

export type BaseButtonProps = {
  title: string;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
} & PressableProps;

const BaseButton: FunctionComponent<BaseButtonProps> = ({
  title,
  disabled,
  textStyle,
  ...rest
}) => {
  return (
    <Pressable
      {...rest}
      accessibilityState={{disabled}}
      accessibilityLabel={title}
      accessibilityRole="button">
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BaseButton;
