import React, {FunctionComponent} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import COLORS from '../constants/colors';
import ShowCard from '../components/ShowCard';
import {useGetAllFavoritedShows} from '../services/shows';
import Heading from '../core/Heading';
import STRINGS from '../constants/strings';

const Favorites: FunctionComponent = () => {
  const {data} = useGetAllFavoritedShows();

  return (
    <SafeAreaView style={styles.view}>
      <Heading variant="lg" style={styles.title}>
        {STRINGS.titles.favorites}
      </Heading>
      <FlatList data={data} renderItem={({item}) => <ShowCard show={item} />} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.darkGrey,
    height: '100%',
  },
  title: {
    textAlign: 'center',
    color: COLORS.teal,
  },
});

export default Favorites;
