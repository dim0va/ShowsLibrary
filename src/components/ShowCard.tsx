import React, {FunctionComponent, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';
import {removeHtmlTags} from '../services/helpers';
import {
  ShowType,
  updateCachedFavoritedShows,
  useIsShowFavorited,
} from '../services/shows';
import {RootStackParamList} from '../navigation/RootNavigation';

import ShowImage from './ShowImage';
import Heading from '../core/Heading';
import ShowTitle from './ShowTitle';
import PrimaryButton from '../core/PrimaryButton';
import SecondaryButton from '../core/SecondaryButton';

type Props = {
  show: ShowType;
};

const ShowCard: FunctionComponent<Props> = ({show}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isFavorited = useIsShowFavorited(show.id);

  const seeShowDetails = useCallback(
    () => navigation.push('SingleShow', {show}),
    [navigation, show],
  );

  const onFavoriteButtonPress = useCallback(
    () => updateCachedFavoritedShows(show),
    [show],
  );

  return (
    <View style={styles.pressable}>
      <ShowImage imageUrl={show.image?.medium} />
      <ShowTitle title={show.name} rating={show.rating?.average} />

      {show.summary && (
        <Heading style={styles.summary} numberOfLines={3}>
          {removeHtmlTags(show.summary)}
        </Heading>
      )}

      <PrimaryButton
        title={STRINGS.buttons.seeDetails}
        onPress={seeShowDetails}
      />
      <SecondaryButton
        onPress={onFavoriteButtonPress}
        title={
          isFavorited ? STRINGS.buttons.unfavorite : STRINGS.buttons.favorite
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    height: 'auto',
    resizeMode: 'contain',
    aspectRatio: 1.7,
  },
  pressable: {
    backgroundColor: COLORS.darkGrey,
    padding: 15,
    marginBottom: 20,
  },
  summary: {
    textAlign: 'justify',
  },
});

export default ShowCard;
