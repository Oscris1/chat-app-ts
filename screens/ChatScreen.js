import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';

import {useSelector} from 'react-redux';

import {useRoute} from '@react-navigation/native';

const ChatScreen = () => {
  const route = useRoute();
  const authData = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const {id, friendAvatar, userId} = route.params;

  const ref = firestore().collection('Chats').doc(id).collection('Messages');

  const avatar =
    authData.userData.avatar ||
    'https://firebasestorage.googleapis.com/v0/b/chat-app-c20dd.appspot.com/o/defAvatar.jpg?alt=media&token=44212c24-deb3-41f2-9251-7931f53d18fa';

  // fetch messages
  useEffect(() => {
    return ref.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {_id, createdAt, text, user} = doc.data();

        // Works only with two users
        // display logged user avatar
        if (user._id === authData.userData.id) {
          user.avatar = avatar;
        } else {
          // display second user avatar
          user.avatar = friendAvatar;
        }
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

    // update current user message data
    firestore()
      .collection('Users')
      .doc(authData.userData.id)
      .collection('Chats')
      .where('user', '==', userId)
      .limit(1)
      .get()
      .then(querySnapshot => {
        firestore()
          .collection('Users')
          .doc(authData.userData.id)
          .collection('Chats')
          .doc(querySnapshot._docs[0]._ref.id) // chat doc id
          .update({
            lastMessage: {
              _id,
              createdAt,
              text,
              user: user._id,
            },
            lastUpdate: createdAt,
            displayed: true,
          });
      });

    // update selected user message data
    firestore()
      .collection('Users')
      .doc(userId)
      .collection('Chats')
      .where('user', '==', authData.userData.id)
      .limit(1)
      .get()
      .then(querySnapshot => {
        firestore()
          .collection('Users')
          .doc(userId)
          .collection('Chats')
          .doc(querySnapshot._docs[0]._ref.id) // chat doc id
          .update({
            lastMessage: {
              _id,
              createdAt,
              text,
              user: user._id,
            },
            lastUpdate: createdAt,
            displayed: false,
          });
      });
  }, []);

  return (
    <GiftedChat
      showUserAvatar={true}
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
        avatar: avatar, // without this there is a small bug with refreshing avatar -> try do something later
      }}
    />
  );
};

export default ChatScreen;
