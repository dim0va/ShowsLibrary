import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import Heading from '../core/Heading';

type Props = {
  title: string;
  rating?: number;
};

const ShowTitle: FunctionComponent<Props> = ({title, rating}) => {
  return (
    <View style={styles.wrapper}>
      <Heading variant="lg" style={styles.title}>
        {title}
      </Heading>

      {rating && (
        <Heading
          style={styles.rating}
          aria-label={`${title} has a rating of ${rating} stars`}>
          {rating}
          &#127775;
        </Heading>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    marginVertical: 10,
    marginRight: 20,
  },
  rating: {
    paddingTop: 15,
  },
});

export default ShowTitle;
