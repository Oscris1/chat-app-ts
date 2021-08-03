import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Text,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const SearchScreen = () => {
  const [emailText, setEmailText] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
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
          const {email} = doc.data();
          const id = doc._ref.id;
          console.log(email);
          console.log(id);
          list.push({
            id,
            email,
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
        renderItem={({item}) => <Text>{item.email}</Text>}
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
