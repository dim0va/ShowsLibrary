import React, {ComponentProps, FunctionComponent} from 'react';
import {StyleSheet, TextInput as RNTextInput} from 'react-native';

import COLORS from '../constants/colors';

type TextInputProps = ComponentProps<typeof RNTextInput>;

const TextInput: FunctionComponent<TextInputProps> = props => {
  return (
    <RNTextInput
      {...props}
      placeholderTextColor={COLORS.gray}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.darkGrey,
    color: COLORS.white,
    padding: 20,
  },
});

export default TextInput;
