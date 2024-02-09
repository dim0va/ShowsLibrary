import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {ShowType} from '../services/shows';
import COLORS from '../constants/colors';

import SingleShow from '../screens/SingleShow';
import Tabs from './Tabs';

export type RootStackParamList = {
  Tabs: undefined;
  SingleShow: {
    show: ShowType;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{...TransitionPresets.ModalPresentationIOS}}>
      <Stack.Screen
        name="Tabs"
        options={{headerShown: false}}
        component={Tabs}
      />
      <Stack.Screen
        name="SingleShow"
        options={{
          headerBackTitle: ' ',
          headerTitle: '',
          headerTintColor: COLORS.white,
          headerStyle: {backgroundColor: COLORS.darkGrey},
          headerTitleStyle: {fontSize: 25},
        }}
        component={SingleShow}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
