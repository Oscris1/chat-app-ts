import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
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
      {/* LogOut Button */}
      <TouchableOpacity style={styles.blackButton} onPress={logOut}>
        <Text style={styles.blackButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  blackButton: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#082032',
    borderRadius: 10,
    width: '70%',
    margin: 2,
    marginVertical: 8,
    paddingVertical: 8,
  },
  blackButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfileScreen;
