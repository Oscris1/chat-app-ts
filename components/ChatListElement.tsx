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
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {RootState} from '../store/index';

import {cropText} from '../utils/utils';

const windowWidth = Dimensions.get('window').width;

interface UserInterface {
  id: string;
  email: string;
  username: string;
  avatar: string;
}

interface Props {
  id: string;
  message?: {
    id: string;
    createdAt: any; //timestamp
    text: string;
    user: string; // message creator's id
  };
  displayed: boolean;
  userId: string;
  chatRef: string;
}

const ChatListElement: React.FC<Props> = ({
  id,
  message,
  displayed,
  userId,
  chatRef,
}) => {
  const authData = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
  // state of selected user
  const [user, setUser] = useState<UserInterface>();

  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/chat-app-c20dd.appspot.com/o/defAvatar.jpg?alt=media&token=44212c24-deb3-41f2-9251-7931f53d18fa';

  const pressChatWrapper = (user: UserInterface) => {
    if (user) {
      // update displayed value
      if (!displayed) {
        firestore()
          .collection('Users')
          .doc(authData.userData.id)
          .collection('Chats')
          .doc(chatRef)
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
    }
  };

  // fetch data of selected user
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(userData => {
        const data = userData.data();
        if (data) {
          const {id, email, username, avatar} = data;
          const av = avatar || defaultAvatar;
          setUser({
            id,
            email,
            username,
            avatar: av,
          });
        }
      });
  }, []);

  if (user) {
    return (
      <TouchableOpacity
        style={displayed ? styles.container : styles.containerNotDisplayed}
        onPress={() => pressChatWrapper(user)}>
        {console.log(`rerender ${user.username}`)}
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
          {message && message.createdAt.split(' ')[0]}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return <View></View>;
  }
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

export default React.memo(ChatListElement);
