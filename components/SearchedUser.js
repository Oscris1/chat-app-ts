import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchedUser = ({item}) => {
  const authData = useSelector(state => state.auth);

  const createChat = () => {
    //create chat
    firestore()
      .collection('Chats')
      .add({})
      .then(chat => {
        // add chat to logged user
        firestore()
          .collection('Users')
          .doc(authData.userData.id)
          .update({
            chats: firestore.FieldValue.arrayUnion({
              id: chat.id,
              user: item.id,
            }),
          });

        // add chat to selected user
        firestore()
          .collection('Users')
          .doc(item.id)
          .update({
            chats: firestore.FieldValue.arrayUnion({
              id: chat.id,
              user: authData.userData.id,
            }),
          });
      });
  };

  return (
    <View style={styles.container}>
      <Text>{item.email}</Text>
      <TouchableOpacity onPress={createChat} style={styles.startChatButton}>
        <Text>Start chat</Text>
      </TouchableOpacity>
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
});

export default SearchedUser;
