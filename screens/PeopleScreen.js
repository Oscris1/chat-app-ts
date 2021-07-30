import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PeopleScreen = () => {
  return (
    <View style={styles.container}>
      <Text>People Screen, Chats list</Text>
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
