import React, {FunctionComponent} from 'react';
import {StyleSheet} from 'react-native';
import COLORS from '../constants/colors';
import BaseButton, {BaseButtonProps} from './Button';

const SecondaryButton: FunctionComponent<BaseButtonProps> = props => (
  <BaseButton style={styles.button} textStyle={styles.text} {...props} />
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.cream,
    borderRadius: 20,
    marginTop: 10,
  },
  text: {
    color: COLORS.teal,
  },
});

export default SecondaryButton;
