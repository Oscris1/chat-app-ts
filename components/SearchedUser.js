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

const windowWidth = Dimensions.get('window').width;

const SearchedUser = ({item, hasChat}) => {
  const authData = useSelector(state => state.auth);
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
            email: item.email,
            username: item.username,
          });

        // add chat to selected user
        firestore()
          .collection('Users')
          .doc(authData.userData.id)
          .get()
          .then(loggedUserData => {
            const {email, username} = loggedUserData.data();
            firestore()
              .collection('Users')
              .doc(item.id)
              .collection('Chats')
              .add({
                id: chat.id,
                user: authData.userData.id,
                email,
                username,
              });
          });

        // Navigate to chat
        navigation.navigate('Chat', {id: chat.id, username: item.username});
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
          <Text>Start chat</Text>
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
  startChatButton: {
    borderRadius: 10,
    backgroundColor: '#64C9CF',
    padding: 5,
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
});

export default SearchedUser;
