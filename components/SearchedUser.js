import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchedUser = ({item}) => {
  return (
    <View style={styles.container}>
      <Text>{item.email}</Text>
      <TouchableOpacity style={styles.startChatButton}>
        <Text>Start chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 40,
    margin: 5,
    padding: 15,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
  },
  startChatButton: {
    borderRadius: 10,
    backgroundColor: '#64C9CF',
    padding: 5,
  },
});

export default SearchedUser;
