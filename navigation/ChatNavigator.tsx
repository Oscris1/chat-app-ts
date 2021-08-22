import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PeopleScreen from '../screens/PeopleScreen';
import ChatScreen from '../screens/ChatScreen';

type ChatStackParamList = {
  PeopleList: undefined,
  Chat: {
  id: string,
  friendAvatar: string,
  userId: string,
  username: string,
  },
}



const ChatStack = createStackNavigator<ChatStackParamList>();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator mode="modal">
      <ChatStack.Screen
        name="PeopleList"
        component={PeopleScreen}
        options={{headerShown: false}}
      />
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) => ({title: route.params.username})}
      />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;
