import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';
import {
  ShowType,
  fetchShows,
  getCachedPaginatedShows,
  searchShows,
} from '../services/shows';

import TextInput from '../core/TextInput';
import BaseButton from '../core/Button';
import ShowCard from '../components/ShowCard';
import LoadingIndicator from '../core/LoadingIndicator';
import Heading from '../core/Heading';

const Library = () => {
  const nextPageRef = useRef<number | null>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [shows, setShows] = useState<ShowType[]>([]);
  const [error, setError] = useState<string>();

  const fetchNextPage = useCallback(async () => {
    if (nextPageRef.current == null) {
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      const fetchedShows = await fetchShows(nextPageRef.current);

      if (fetchedShows.length === 0) {
        // We have reached the end; prevent more fetches
        nextPageRef.current = null;
      } else {
        setShows(prev => [...prev, ...fetchedShows]);
        nextPageRef.current++;
      }
    } catch {
      setError(STRINGS.errors.generic);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSearch = useCallback(async () => {
    if (searchWord.length === 0) {
      setError(STRINGS.errors.searchWordLength);
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      const searchedShows = await searchShows(searchWord);
      setShows(searchedShows);

      if (searchedShows.length === 0) {
        setError(STRINGS.errors.noResults);
      }
    } catch {
      setError(STRINGS.errors.generic);
    } finally {
      setIsLoading(false);
    }
  }, [searchWord]);

  const onChangeText = useCallback((text: string) => {
    setError('');

    if (text.length === 0) {
      // If the text input is cleared, display the first page cached results
      setShows(getCachedPaginatedShows(1));
    } else {
      setSearchWord(text.trim().toLowerCase());
    }
  }, []);

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <SafeAreaView style={styles.view}>
      <Heading variant="lg" style={styles.title}>
        {STRINGS.titles.library}
      </Heading>

      <View style={styles.searchWrapper}>
        <TextInput
          placeholder={STRINGS.searchPlaceholder}
          onChangeText={onChangeText}
        />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <BaseButton
            onPress={onSearch}
            title={STRINGS.buttons.go}
            textStyle={styles.searchButtonText}
          />
        )}
      </View>

      {error && (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}

      <FlatList
        data={shows}
        onEndReachedThreshold={0.9}
        onEndReached={fetchNextPage}
        renderItem={({item}) => <ShowCard show={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.darkGrey,
    height: '100%',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    color: COLORS.teal,
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  searchButtonText: {
    fontSize: 20,
    color: COLORS.teal,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Library;
