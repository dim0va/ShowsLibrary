import {useEffect, useMemo, useState} from 'react';
import {useQuery} from 'react-query';

import queryClient from './queryClient';
import request from './request';

export type ShowType = {
  id: number;
  name: string;
  genres: string[];
  rating: {
    average?: number;
  };
  image?: {
    medium: string;
    original: string;
  };
  language?: string;
  officialSite?: string;
  summary?: string;
  premiered?: string;
  network: {
    name: string;
    country?: {
      name: string;
    };
  };
  favorited?: boolean; // custom prop, not coming from the API
};

type ShowApiResponse = {
  score: number;
  show: ShowType;
};

const SEARCH_SHOWS_QUERY_KEY = 'shows_query_key';
const PAGINATED_SHOWS_QUERY_KEY = 'paginated_shows_query_key';
const FAVORITES_LIST_QUERY_KEY = 'favorites_list_query_key';

// Paginated shows

export const fetchShows = async (page = 1): Promise<ShowType[]> => {
  const cachedShows = getCachedPaginatedShows(page);

  if (cachedShows.length > 0) {
    return cachedShows;
  }

  const {data} = await request.get(`/shows?page=${page}`);

  updateCachedPaginatedShows(page, data);

  return data;
};

export const getCachedPaginatedShows = (page: number) =>
  queryClient.getQueryData<ShowType[]>([PAGINATED_SHOWS_QUERY_KEY, {page}]) ||
  [];

export const updateCachedPaginatedShows = (page: number, shows: ShowType[]) =>
  queryClient.setQueryData<ShowType[]>(
    [PAGINATED_SHOWS_QUERY_KEY, {page}],
    shows,
  );

// Searched shows

export const searchShows = async (search: string): Promise<ShowType[]> => {
  const cachedShows = getCachedSearchedShows(search);

  if (cachedShows.length > 0) {
    return cachedShows;
  }

  const {data} = await request.get(`/search/shows?q=${search}`);

  const shows = (data as ShowApiResponse[]).map(result => result.show);
  updateCachedSearchedShows(search, shows);

  return shows;
};

export const getCachedSearchedShows = (search: string) =>
  queryClient.getQueryData<ShowType[]>([SEARCH_SHOWS_QUERY_KEY, {search}]) ||
  [];

export const updateCachedSearchedShows = (search: string, shows: ShowType[]) =>
  queryClient.setQueryData<ShowType[]>(
    [SEARCH_SHOWS_QUERY_KEY, {search}],
    shows,
  );

// Favorites
export const updateCachedFavoritedShows = (show: ShowType) => {
  const favoritedShows =
    queryClient.getQueryData<ShowType[]>([FAVORITES_LIST_QUERY_KEY]) || [];

  const updatedFavoritedShows = favoritedShows.some(({id}) => id === show.id)
    ? favoritedShows.filter(({id}) => id !== show.id)
    : [...favoritedShows, {...show, favorited: true}];

  queryClient.setQueryData([FAVORITES_LIST_QUERY_KEY], updatedFavoritedShows);
};

export const useGetAllFavoritedShows = () =>
  useQuery<ShowType[]>([FAVORITES_LIST_QUERY_KEY]);

// This hook will make sure all favorite buttons are up to date with the current state of the show
export const useIsShowFavorited = (showId: number) => {
  const {data: shows} = useQuery<ShowType[]>([FAVORITES_LIST_QUERY_KEY]);

  const show = useMemo(
    () => shows?.find(({id}) => id === showId),
    [shows, showId],
  );
  const [isFavorited, setIsFavorited] = useState(show?.favorited || false);

  useEffect(() => setIsFavorited(show?.favorited || false), [show?.favorited]);

  return isFavorited;
};
