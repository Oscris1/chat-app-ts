import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

const LogInScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = () => {
    if (!email || !password) return;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Logged In');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('Invalid email!');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('Wrong Password!');
        }
        if (error.code === 'auth/user-not-found') {
          console.log("User doesn't exist!");
        }
        console.error(error);
        setEmail('');
        setPassword('');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Log In</Text>
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
      <Button onPress={login} title="Log In" color="green" />
      <Button
        onPress={() => navigation.navigate('Register')}
        title="Create New Account"
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

export default LogInScreen;
