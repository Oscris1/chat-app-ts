import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ErrorMessageBox from '../components/ErrorMessageBox';

const RegistrationScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const register = () => {
    setErrorMessage();
    if (!email || !password) return;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User account created & signed in!');
        navigation.navigate('LogIn');

        // Create user document
        firestore()
          .collection('Users')
          .doc(user.user._user.uid)
          .set({
            id: user.user._user.uid,
            email: email,
            username: fullName,
          })
          .then(() => {
            console.log('User added!');
          });

        setEmail('');
        setPassword('');
        setFullName('');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setErrorMessage('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setErrorMessage('That email address is invalid!');
        }

        setEmail('');
        setPassword('');
        setFullName('');
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register</Text>
      {errorMessage && <ErrorMessageBox errorMessage={errorMessage} />}
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setFullName}
        value={fullName}
        placeholder="Full name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.blackButton} onPress={register}>
        <Text style={styles.blackButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Navigate to log in screen button */}
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => navigation.navigate('LogIn')}>
        <Text style={styles.emptyButtonText}>Log In page</Text>
      </TouchableOpacity>
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
    borderWidth: 2,
    padding: 8,
    borderColor: '#082032',
    borderRadius: 10,
    width: '70%',
    marginVertical: 8,
  },
  blackButton: {
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
  emptyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    margin: 2,
    marginVertical: 8,
    paddingVertical: 8,
  },
  emptyButtonText: {
    color: '#082032',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default RegistrationScreen;
