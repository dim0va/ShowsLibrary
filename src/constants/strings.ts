const STRINGS = {
  errors: {
    generic: 'Ops! Something went wrong. Please try again later!',
    searchWordLength: 'Type something in the field in order to search.',
    noResults: 'No results were found for this search.',
  },
  buttons: {
    favorite: 'Add to favorites',
    unfavorite: 'Remove from favorites',
    seeDetails: 'See show details',
    go: 'GO',
  },
  labels: {
    rating: '$name has a rating of $rating stars',
  },
  titles: {
    library: 'The Shows Library',
    favorites: 'Your Favorites Shows Library',
  },
  tabs: {
    library: 'Library',
    favorites: 'Favorites',
  },
  searchPlaceholder: 'Search for your favorite shows...',
} as const;

export default STRINGS;
