import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import PeopleScreen from '../screens/PeopleScreen';
import ProfileScreen from '../screens/ProfileScreen';

import ChatNavigator from './ChatNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="People" component={ChatNavigator}></Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
