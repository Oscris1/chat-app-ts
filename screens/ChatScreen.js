import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';

import {useSelector, useDispatch} from 'react-redux';

import {useRoute} from '@react-navigation/native';

const ChatScreen = () => {
  const route = useRoute();
  const authData = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const {id} = route.params;

  const ref = firestore().collection('Chats').doc(id).collection('Messages');

  // fetch messages
  useEffect(() => {
    return ref.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {_id, createdAt, text, user} = doc.data();
        list.push({
          _id,
          createdAt: createdAt.toDate(),
          text,
          user,
        });
      });

      setMessages(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);
  // Send message
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    ref.add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            textStyle={{
              left: {
                color: 'black',
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: 'lightgrey',
              },
            }}
          />
        );
      }}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: authData.userData.id,
        name: authData.userData.email,
      }}
    />
  );
};

export default ChatScreen;
