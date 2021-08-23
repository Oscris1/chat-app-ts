import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import LogInScreen from '../screens/LogInScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import TabNavigator from './TabNavigator';

type RootStackParamList = {
  LogIn: undefined;
  Register: undefined;
  Main: undefined;
};

export type LogInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LogIn'
>;

export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
