import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import ChatListElement from '../components/ChatListElement';

const PeopleScreen = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const ref = firestore().collection('Chats');

  // fetch messages
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        list.push({
          id: documentSnapshot.id,
        });
      });
      setChats(list);
      console.log(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>People Screen, Chats list</Text>

      <FlatList
        style={styles.menuList}
        data={chats}
        renderItem={({item}) => <ChatListElement id={item.id} />}
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
});

export default PeopleScreen;
