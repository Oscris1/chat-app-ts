import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ChatListElement = ({id, item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', {id})}
      style={styles.container}>
      <Text>{item.email}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default ChatListElement;
