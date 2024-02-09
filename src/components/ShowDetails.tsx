import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import COLORS from '../constants/colors';

import Heading from '../core/Heading';

type Props = {
  title?: string;
  value?: string | React.JSX.Element;
};

const ShowDetails: FunctionComponent<Props> = ({title, value}) => {
  if (!title || !value) {
    return null;
  }

  return (
    <>
      <View style={styles.separator} />
      <View style={styles.wrapper}>
        <Heading>{title}</Heading>
        {typeof value === 'string' ? (
          <Heading variant="sm">{value}</Heading>
        ) : (
          value
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    marginVertical: 15,
    backgroundColor: COLORS.cream,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

export default ShowDetails;
