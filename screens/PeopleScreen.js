import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import ChatListElement from '../components/ChatListElement';

const PeopleScreen = () => {
  const authData = useSelector(state => state.auth);

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const ref = firestore()
    .collection('Users')
    .doc(authData.userData.id)
    .collection('Chats');

  // fetch Chats
  useEffect(() => {
    return ref.orderBy('lastUpdate', 'desc').onSnapshot(querySnapshot => {
      // List of user's chats
      const list = [];
      querySnapshot.forEach(documentSnapshot => {
        // data inside the Chat doc
        const {id, user, lastMessage, lastUpdate} = documentSnapshot.data();
        list.push({
          id,
          user,
          lastMessage,
          lastUpdate,
        });
      });
      setChats(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, [authData.status]);

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>Messages</Text>

      <FlatList
        style={styles.menuList}
        data={chats}
        renderItem={({item}) => (
          <ChatListElement
            id={item.id}
            item={item}
            message={item.lastMessage}
          />
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
    backgroundColor: '#fff',
  },
  menuList: {
    borderTopWidth: 1,
    borderColor: '#DAD0C2',
  },
  messageText: {
    padding: 10,
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 22,
  },
});

export default PeopleScreen;
