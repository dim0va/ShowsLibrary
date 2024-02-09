import React, {FunctionComponent} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, StyleSheet} from 'react-native';

import COLORS from '../constants/colors';
import STRINGS from '../constants/strings';

import Library from '../screens/Library';
import Favorites from '../screens/Favorites';
import Heading from '../core/Heading';

const Tab = createBottomTabNavigator();

const TABS = {
  Library: STRINGS.tabs.library,
  Favorites: STRINGS.tabs.favorites,
};

const Tabs: FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName={STRINGS.tabs.library}
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: COLORS.teal,
        }}>
        <Tab.Screen
          name={STRINGS.tabs.library}
          component={Library}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: LibraryTabHeader,
          }}
        />
        <Tab.Screen
          name={TABS.Favorites}
          component={Favorites}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: FavoritesTabHeader,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

type TabHeaderProps = {
  focused: boolean;
  color: string;
  size: number;
};

const LibraryTabHeader = ({color}: TabHeaderProps) => (
  <Heading style={{color}}>{STRINGS.tabs.library}</Heading>
);

const FavoritesTabHeader = ({color}: TabHeaderProps) => (
  <Heading style={{color}}>{STRINGS.tabs.favorites}</Heading>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.darkGrey,
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.darkGrey,
  },
});

export default Tabs;
