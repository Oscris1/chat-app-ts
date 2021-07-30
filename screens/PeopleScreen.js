import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PeopleScreen = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const ref = firestore().collection('Chats');

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
        _id: 1,
        name: 'Damian',
      }}
    />
  );
};

export default PeopleScreen;
