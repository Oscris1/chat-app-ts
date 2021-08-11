import React from 'react';
import {TouchableOpacity, Dimensions, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const ChatListElement = ({id, item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', {id, username: item.username})}
      style={styles.container}>
      <Text style={styles.username}>{item.username}</Text>
      <Text>{item.email}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    padding: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#D1D9D9',
  },
  username: {
    fontWeight: '700',
    fontSize: 18,
  },
});

export default ChatListElement;
