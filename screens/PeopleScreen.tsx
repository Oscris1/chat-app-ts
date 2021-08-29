import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import ChatListElement from '../components/ChatListElement';
import {RootState} from '../store/index';

interface UserChatInterface {
  id: string; // chat id
  user: string; // chat user id
  lastMessage: {
    id: string;
    createdAt: any; //timestamp
    text: string;
    user: string; // message creator's id
  };
  lastUpdate: string;
  displayed: boolean;
  chatRef: string;
}

const PeopleScreen = () => {
  const authData = useSelector((state: RootState) => state.auth);
  const isFocused = useIsFocused();
  console.log(isFocused);

  const [loading, setLoading] = useState<boolean>(true);
  const [chats, setChats] = useState<UserChatInterface[]>([]);

  const ref = firestore()
    .collection('Users')
    .doc(authData.userData.id)
    .collection('Chats');

  useFocusEffect(
    //fetch only if screen is focused
    React.useCallback(() => {
      return ref.orderBy('lastUpdate', 'desc').onSnapshot(querySnapshot => {
        // List of user's chats
        const list: UserChatInterface[] = [];
        querySnapshot.forEach(documentSnapshot => {
          // data inside the User -> Chat doc
          const {id, user, lastMessage, lastUpdate, displayed} =
            documentSnapshot.data();
          const chatRef = documentSnapshot.id;
          list.push({
            id,
            user,
            lastMessage,
            lastUpdate,
            chatRef,
            displayed,
          });
        });
        setChats(list);

        if (loading) {
          setLoading(false);
        }
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
