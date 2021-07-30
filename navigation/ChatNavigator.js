import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PeopleScreen from '../screens/PeopleScreen';
import ChatScreen from '../screens/ChatScreen';

const ChatStack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator mode="modal">
      <ChatStack.Screen
        name="People List"
        component={PeopleScreen}
        options={{headerShown: false}}
      />
      <ChatStack.Screen name="Chat" component={ChatScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;
