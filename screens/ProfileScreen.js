import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

import {logOutState} from '../store/auth-slice';

import {useDispatch} from 'react-redux';

import ImageSelector from '../components/ImageSelector';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('LogIn');
        dispatch(logOutState());
      });
  };

  return (
    <View style={styles.container}>
      <ImageSelector />
      <View style={styles.logOutBox}>
        <Button onPress={logOut} title="Log out" color="#AFBBF2" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logOutBox: {
    justifyContent: 'center',
    width: '70%',
  },
});

export default ProfileScreen;
