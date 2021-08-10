import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';

import {logIn} from '../store/auth-slice';
import ErrorMessageBox from '../components/ErrorMessageBox';

const LogInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [initializing, setInitializing] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const createNewAccountButtonHandler = () => {
    navigation.navigate('Register');
    setErrorMessage();
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      dispatch(logIn(user._user));
      navigation.navigate('Main');
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  const login = () => {
    setErrorMessage();
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
          setErrorMessage('Invalid email!');
          setEmail('');
          setPassword('');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('Wrong Password!');
          setErrorMessage('Wrong Password!');
          setPassword('');
        }
        if (error.code === 'auth/user-not-found') {
          console.log("User doesn't exist!");
          setErrorMessage("User doesn't exist!");
          setEmail('');
          setPassword('');
        }
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Log In</Text>

      {errorMessage && <ErrorMessageBox errorMessage={errorMessage} />}
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

      {/* Login Button */}
      <TouchableOpacity style={styles.blackButton} onPress={login}>
        <Text style={styles.blackButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Navigate to registration screen button */}
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={createNewAccountButtonHandler}>
        <Text style={styles.emptyButtonText}>Create New Account</Text>
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

export default LogInScreen;
