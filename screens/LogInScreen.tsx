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
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../store/index';
import {RootState} from '../store/index';
import {LogInScreenNavigationProp} from '../navigation/RootNavigator';
import {signIn, getUser} from '../store/auth-slice';

import ErrorMessageBox from '../components/ErrorMessageBox';

type Props = {
  navigation: LogInScreenNavigationProp;
};

const LogInScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
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
      dispatch(getUser(user.uid));
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
    }
  }, [authData.status]);

  const login = () => {
    setErrorMessage(undefined);
    if (!email || !password) return;

    dispatch(signIn({email, password}))
      .unwrap()
      .then(userId => {
        dispatch(getUser(userId)).then(() => {
          setEmail('');
          setPassword('');
        });
      })
      .catch(err => {
        if (err === 'auth/invalid-email') {
          console.log('Invalid email!');
          setErrorMessage('Invalid email!');
          setEmail('');
        }
        if (err === 'auth/wrong-password') {
          console.log('Wrong Password!');
          setErrorMessage('Wrong Password!');
        }
        if (err === 'auth/user-not-found') {
          console.log("User doesn't exist!");
          setErrorMessage("User doesn't exist!");
          setEmail('');
        }
        setPassword('');
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
