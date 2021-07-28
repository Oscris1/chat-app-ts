import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LogInScreen from '../screens/LogInScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const RootStack = createStackNavigator();

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
    </RootStack.Navigator>
  );
};

export default RootNavigator;
