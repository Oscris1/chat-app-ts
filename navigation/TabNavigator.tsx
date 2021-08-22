import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PeopleScreen from '../screens/PeopleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

import ChatNavigator from './ChatNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'People') {
            return (
              <Ionicons name="md-chatbox-ellipses" size={size} color={color} />
            );
          } else if (route.name === 'Search') {
            return <Ionicons name="search" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <Ionicons name="settings" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#082032',
        activeBackgroundColor: '#EEEEEE',
        inactiveTintColor: '#787A91',
      }}>
      <Tab.Screen name="People" component={ChatNavigator}></Tab.Screen>
      <Tab.Screen name="Search" component={SearchScreen}></Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
