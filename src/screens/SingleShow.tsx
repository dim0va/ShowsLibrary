import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';
import {
  ShowType,
  updateCachedFavoritedShows,
  useIsShowFavorited,
} from '../services/shows';
import {openLink, removeHtmlTags} from '../services/helpers';

import ShowDetails from '../components/ShowDetails';
import Heading from '../core/Heading';
import ShowImage from '../components/ShowImage';
import {RootStackParamList} from '../navigation/RootNavigation';
import PrimaryButton from '../core/PrimaryButton';

type Props = StackScreenProps<RootStackParamList, 'SingleShow'>;

const generateShowDetails = (show: ShowType) => [
  {title: 'Genres', value: show.genres.join()},
  {title: 'Language', value: show.language},
  {title: 'Premiered Date', value: show.premiered},
  {title: 'Country', value: show.network?.country?.name},
  {
    title: 'Official Website',
    value: (
      <Heading
        variant="sm"
        accessibilityRole="link"
        onPress={() => openLink(show.officialSite)}>
        {show.officialSite}
      </Heading>
    ),
  },
];

const SingleShow: FunctionComponent<Props> = ({route}) => {
  const show = route.params.show;
  const isFavorited = useIsShowFavorited(show.id);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(
    () => navigation.setOptions({headerTitle: show.name}),
    [navigation, show.name],
  );

  const onFavoriteButtonPress = useCallback(
    () => updateCachedFavoritedShows(show),
    [show],
  );

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        <ShowImage imageUrl={show.image?.original} style={styles.image} />

        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <Heading variant="lg" style={styles.title}>
              {show.name}
            </Heading>

            {show.rating.average && (
              <Heading
                style={styles.rating}
                aria-label={`${show.name} has a rating of ${show.rating.average} stars`}>
                {show.rating.average}
                &#127775;
              </Heading>
            )}
          </View>

          {show.summary && (
            <Heading style={styles.summary}>
              {removeHtmlTags(show.summary)}
            </Heading>
          )}

          {generateShowDetails(show).map(({title, value}) => (
            <ShowDetails key={title} title={title} value={value} />
          ))}

          <PrimaryButton
            title={
              isFavorited
                ? STRINGS.buttons.unfavorite
                : STRINGS.buttons.favorite
            }
            onPress={onFavoriteButtonPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: COLORS.cream,
    marginVertical: 15,
  },
  wrapper: {
    marginHorizontal: 10,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    marginVertical: 10,
    marginRight: 20,
  },
  summary: {
    textAlign: 'justify',
  },
  rating: {
    paddingTop: 15,
  },
  image: {
    height: 350,
  },
  view: {
    backgroundColor: COLORS.darkGrey,
    height: '100%',
    flex: 1,
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  searchButtonText: {
    fontSize: 50,
    color: COLORS.teal,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: 'left',
  },
});

export default SingleShow;
