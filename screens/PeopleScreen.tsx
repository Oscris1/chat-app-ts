import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import ChatListElement from '../components/ChatListElement';
import {RootState, useAppDispatch} from '../store/index';
import {fetchUserChats} from '../store/chats-slice';

const PeopleScreen = () => {
  const authData = useSelector((state: RootState) => state.auth);

  const chatsData = useSelector((state: RootState) => state.chats);
  const chats = chatsData.chatsList;
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  console.log(isFocused);

  const ref = firestore()
    .collection('Users')
    .doc(authData.userData.id)
    .collection('Chats');

  // fetch Chats
  useFocusEffect(
    //fetch only if screen is focused
    React.useCallback(() => {
      return ref.orderBy('lastUpdate', 'desc').onSnapshot(querySnapshot => {
      dispatch(fetchUserChats(querySnapshot));
    });
    }, []),
  );


  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>Messages</Text>

      <FlatList
        style={styles.menuList}
        data={chats}
        renderItem={({item}) => (
          <ChatListElement
            id={item.id}
            userId={item.user}
            chatRef={item.chatRef}
            message={item.lastMessage}
            displayed={item.displayed}
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
