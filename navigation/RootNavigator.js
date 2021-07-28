import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LogInScreen from '../screens/LogInScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import TabNavigator from './TabNavigator';

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
      <RootStack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
