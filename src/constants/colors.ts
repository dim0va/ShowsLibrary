const COLORS = {
  white: '#fff',
  black: '#000',
  cream: '#F7F5EF',
  darkGrey: '#2D2926',
  teal: '#2B7D82',
  gray: '#A6A29Efa',
  red: '#F27E7E',
} as const;

export type Color = keyof typeof COLORS;

export default COLORS;
