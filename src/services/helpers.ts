import {Linking} from 'react-native';

export const removeHtmlTags = (string: string) =>
  string.replace(/<[^>]*>/g, '');

export const openLink = async (link?: string) => {
  if (!link) {
    return;
  }

  const res = await Linking.canOpenURL(link);

  if (res) {
    Linking.openURL(link);
  }
};
