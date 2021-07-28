import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({navigation}) => {
  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('LogIn');
      });
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button onPress={logOut} title="Log out" color="#AFBBF2" />
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

export default ProfileScreen;
