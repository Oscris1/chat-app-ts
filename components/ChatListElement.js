import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;

const ChatListElement = ({id, item}) => {
  // state of selected user
  const [user, setUser] = useState({});

  // state of last message
  const [message, setMessage] = useState();

  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/chat-app-c20dd.appspot.com/o/defAvatar.jpg?alt=media&token=44212c24-deb3-41f2-9251-7931f53d18fa';

  // fetch data of selected user
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(item.user)
      .get()
      .then(userData => {
        setUser(userData.data());
      });
  }, []);

  //fetch last message info
  useEffect(() => {
    return firestore()
      .collection('Chats')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        setMessage(documentSnapshot.data().lastMessage);
      });
  }, []);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Chat', {
          id,
          username: user.username, // data to display username in ChatScreen header
          friendAvatar: user.avatar || defaultAvatar, // friend's avatar in Chat Screen
          userId: user.id, // selected user id -> update last message
        })
      }>
      {/** display user's avatar, else if user doesn't have avatar  display default image */}
      <Image
        style={styles.tinyLogo}
        source={{
          uri: user.avatar || defaultAvatar,
        }}
      />

      <View style={styles.textBox}>
        <Text style={styles.username}>{user.username}</Text>
        {/** crop a message if length >= 30 */}
        <Text>
          {message &&
            `${message.text.substring(0, 30)} ${
              message.text.length >= 30 ? '...' : ''
            }`}
        </Text>
      </View>

      {/** Last message timer */}
      <Text style={styles.time}>
        {message && message.createdAt.toDate().toTimeString().split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth,
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D1D9D9',
  },
  textBox: {
    marginLeft: 20,
  },

  username: {
    fontWeight: '700',
    fontSize: 15,
  },
  time: {
    position: 'absolute',
    top: 18,
    right: 18,
    color: '#47597E',
    fontSize: 13,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});

export default ChatListElement;
