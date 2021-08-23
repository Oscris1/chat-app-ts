import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

import {RootState} from '../store/index';

const windowWidth = Dimensions.get('window').width;

interface Props {
  hasChat: boolean;
  item: {
    id: string;
    email: string;
    username: string;
    avatar: string;
  };
}

const SearchedUser: React.FC<Props> = ({item, hasChat}) => {
  const authData = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();

  // create chat handler
  const createChat = () => {
    if (hasChat) return;

    //create chat
    firestore()
      .collection('Chats')
      .add({})
      .then(chat => {
        // add chat to logged user
        firestore()
          .collection('Users')
          .doc(authData.userData.id)
          .collection('Chats')
          .add({
            id: chat.id,
            user: item.id,
            lastUpdate: new Date(),
            displayed: true,
          });

        // add chat to selected user

        firestore().collection('Users').doc(item.id).collection('Chats').add({
          id: chat.id,
          user: authData.userData.id,
          lastUpdate: new Date(),
          displayed: true,
        });

        // Navigate to chat
        navigation.navigate('Chat', {
          id: chat.id,
          username: item.username,
          userId: item.id,
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDataBox}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.avatar,
          }}
        />
        <View>
          <Text style={styles.username}>{item.username}</Text>
          <Text>{item.email}</Text>
        </View>
      </View>
      {!hasChat && authData.userData.id != item.id && (
        <TouchableOpacity onPress={createChat} style={styles.startChatButton}>
          <Text style={styles.startChatButtonText}>Start chat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userDataBox: {
    flexDirection: 'row',
  },
  username: {
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 4,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginHorizontal: 4,
  },
  startChatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      'hsl(205.71428571428572, 72.41379310344827%, 19.372549019607844%)',
    borderRadius: 10,
    width: '23%',
    marginHorizontal: 5,
    paddingVertical: 8,
  },
  startChatButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SearchedUser;
