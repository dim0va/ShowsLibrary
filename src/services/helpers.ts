import {Linking} from 'react-native';

export const removeHtmlTags = (string: string) =>
  string.replace(/<[^>]*>/g, '');

export const openLink = async (link?: string) => {
  console.log(link, 'link');
  if (!link) {
    return;
  }

  const res = await Linking.canOpenURL(link);
  console.log('tuka?', res);

  if (res) {
    Linking.openURL(link);
  }
};
