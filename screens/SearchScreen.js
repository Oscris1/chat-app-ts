import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {useSelector} from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import SearchedUser from '../components/SearchedUser';

const defaultAvatar =
  'https://firebasestorage.googleapis.com/v0/b/chat-app-c20dd.appspot.com/o/defAvatar.jpg?alt=media&token=44212c24-deb3-41f2-9251-7931f53d18fa';

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
          const {email, username, avatar} = doc.data();
          const id = doc._ref.id;
          console.log(email);
          console.log(id);
          list.push({
            id,
            email,
            username,
            avatar: avatar || defaultAvatar,
          });
        });
        setSearchedUsers(list);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          onChangeText={setEmailText}
          value={emailText}
          placeholder="Search by email"
        />
        <TouchableOpacity style={styles.blackButton} onPress={searchByEmail}>
          <Text style={styles.blackButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.usersList}
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
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
    marginBottom: 2,
  },
  input: {
    borderWidth: 2,
    padding: 8,
    borderColor: '#082032',
    borderRadius: 10,
    width: '70%',
    marginVertical: 8,
  },
  blackButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#082032',
    borderRadius: 10,
    width: '20%',
    margin: 2,
    marginVertical: 8,
    paddingVertical: 8,
  },
  blackButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SearchScreen;
