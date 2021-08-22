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
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '../store/index'

import {cropText} from '../utils/utils';

const windowWidth = Dimensions.get('window').width;

interface UserInterface {
  id?: string
  email?: string
  username?: string
  avatar?: string
}

const ChatListElement = ({id, item, message, displayed}) => {
  const authData = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
  // state of selected user
  const [user, setUser] = useState<UserInterface>({});

  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/chat-app-c20dd.appspot.com/o/defAvatar.jpg?alt=media&token=44212c24-deb3-41f2-9251-7931f53d18fa';

  const pressChatWrapper = () => {
    // update displayed value
    if (!displayed) {
      firestore()
        .collection('Users')
        .doc(authData.userData.id)
        .collection('Chats')
        .doc(item.chatRef)
        .update({
          displayed: true,
        });
    }
    navigation.navigate('Chat', {
      id,
      username: user.username, // data to display username in ChatScreen header
      friendAvatar: user.avatar || defaultAvatar, // friend's avatar in Chat Screen
      userId: user.id, // selected user id -> update last message
    });
  };

  // fetch data of selected user
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(item.user)
      .get()
      .then(userData => {
        const {id, email, username, avatar} = userData.data()
        const av = avatar || defaultAvatar
        setUser({
          id,
          email,
          username,
          avatar: av,
        });
      });
  }, []);

  return (
    <TouchableOpacity
      style={displayed ? styles.container : styles.containerNotDisplayed}
      onPress={pressChatWrapper}>
      {/** display user's avatar, else if user doesn't have avatar  display default image */}
      <Image
        style={styles.tinyLogo}
        source={{
          uri: user.avatar,
        }}
      />

      <View style={styles.textBox}>
        <Text style={styles.username}>{user.username}</Text>
        {/** crop a message if length >= 30 */}
        <Text style={displayed ? styles.text : styles.textNotDisplayed}>
          {message && cropText(message.text, 30)}
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
  containerNotDisplayed: {
    flexDirection: 'row',
    width: windowWidth,
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: '#E1E8EB',
  },
  textBox: {
    marginLeft: 20,
  },
  text: {
    color: '#000',
    fontSize: 13,
  },
  textNotDisplayed: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
  },

  username: {
    fontWeight: '700',
    fontSize: 17,
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
