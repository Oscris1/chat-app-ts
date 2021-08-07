import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Button, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import SearchedUser from '../components/SearchedUser';

const SearchScreen = () => {
  const [emailText, setEmailText] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatUsers, setChatUsers] = useState([]);

  const authData = useSelector(state => state.auth);

  const ref = firestore()
    .collection('Users')
    .doc(authData.userData.id)
    .collection('Chats');

  // fetch Chat Users
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      // List of users id (for check if chat already exist)
      const list = [];
      querySnapshot.forEach(documentSnapshot => {
        // data inside the Chat doc
        const {user} = documentSnapshot.data();
        list.push(user);
      });
      setChatUsers(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  // search user by email
  const searchByEmail = () => {
    firestore()
      .collection('Users')
      .where('email', '>=', emailText)
      .where('email', '<=', emailText + '~')
      .get()
      .then(users => {
        const list = [];
        users.forEach(doc => {
          const {email, username} = doc.data();
          const id = doc._ref.id;
          console.log(email);
          console.log(id);
          list.push({
            id,
            email,
            username,
          });
        });
        setSearchedUsers(list);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setEmailText}
        value={emailText}
        placeholder="Search by email"
      />
      <Button onPress={searchByEmail} title="Search" color="#AFBBF2" />
      <FlatList
        style={styles.menuList}
        data={searchedUsers}
        renderItem={({item}) => (
          <SearchedUser item={item} hasChat={chatUsers.includes(item.id)} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#AFBBF2',
    width: '70%',
    margin: 2,
  },
});

export default SearchScreen;
