import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/index';
import {LogInScreenNavigationProp} from '../navigation/RootNavigator';

import {loginHandler} from '../utils/loginHandler';
import ErrorMessageBox from '../components/ErrorMessageBox';

type Props = {
  navigation: LogInScreenNavigationProp;
};

const LogInScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.auth);

  const [initializing, setInitializing] = useState<boolean>(true);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const [loading, setLoading] = useState<boolean>(false);

  const createNewAccountButtonHandler = () => {
    navigation.navigate('Register');
    setErrorMessage(undefined);
  };

  // Handle user state changes
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      setLoading(true);
      loginHandler(user, dispatch);
    } else {
      setLoading(false);
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (authData.status === 'success') {
      setLoading(false);
      navigation.navigate('Main');
    }
  }, [authData.status]);

  const login = () => {
    setErrorMessage(undefined);
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
        //console.error(error);
      });
  };

  if (initializing) return null;
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Logging in...</Text>
      </View>
    );
  } else {
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
  }
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
