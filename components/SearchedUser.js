import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
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
      <View>
        <Text style={styles.username}>{item.username}</Text>
        <Text>{item.email}</Text>
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
    width: windowWidth - 40,
    margin: 5,
    padding: 15,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
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
  },
});

export default SearchedUser;
