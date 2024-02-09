import React, {FunctionComponent} from 'react';
import {StyleSheet} from 'react-native';

import COLORS from '../constants/colors';

import BaseButton, {BaseButtonProps} from './Button';

const PrimaryButton: FunctionComponent<BaseButtonProps> = props => (
  <BaseButton style={styles.button} {...props} />
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.teal,
    borderRadius: 20,
    marginTop: 10,
  },
});

export default PrimaryButton;
