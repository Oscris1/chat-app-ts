import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const PeopleScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>People Screen, Chats list</Text>
      <Button
        onPress={() => navigation.navigate('Chat')}
        title="idz do czatu"
        color="#AFBBF2"
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
