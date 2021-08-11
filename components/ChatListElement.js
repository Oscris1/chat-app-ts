import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const ChatListElement = ({id, item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', {id, username: item.username})}
      style={styles.container}>
      {/**To do -> change to user image */}
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/chat-app-c20dd.appspot.com/o/defAvatar.jpg?alt=media&token=44212c24-deb3-41f2-9251-7931f53d18fa',
        }}
      />
      <View style={styles.textBox}>
        <Text style={styles.username}>{item.username}</Text>
        <Text>{item.email}</Text>
      </View>

      {/**To do -> change to last message time */}
      <Text style={styles.time}>21:22</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth,
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D1D9D9',
  },
  textBox: {
    marginLeft: 20,
  },

  username: {
    fontWeight: '700',
    fontSize: 15,
  },
  time: {
    position: 'absolute',
    top: 18,
    right: 18,
    color: '#47597E',
    fontSize: 13,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});

export default ChatListElement;
