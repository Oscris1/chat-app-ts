import React from 'react';
import {TouchableOpacity, Dimensions, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

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
    backgroundColor:
      'hsl(211.01694915254237, 50.86206896551724%, 80.50980392156863%)',
    width: windowWidth - 40,
    margin: 5,
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
  },
});

export default ChatListElement;
