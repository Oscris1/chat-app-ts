import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegistrationScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const register = () => {
    if (!email || !password) return;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User account created & signed in!');
        setEmail('');
        setPassword('');

        // Create user document
        firestore()
          .collection('Users')
          .doc(user.user._user.uid)
          .set({
            id: user.user._user.uid,
            email: email,
          })
          .then(() => {
            console.log('User added!');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button onPress={register} title="Register" color="green" />
      <Button
        onPress={() => navigation.navigate('LogIn')}
        title="Log In page"
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
  headerText: {
    fontSize: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#AFBBF2',
    width: '70%',
    margin: 2,
  },
});

export default RegistrationScreen;
