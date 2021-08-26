import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch} from '../store/index';
import {RegisterScreenNavigationProp} from '../navigation/RootNavigator';
import ErrorMessageBox from '../components/ErrorMessageBox';
import {inputValidation} from '../utils/utils';

import {createUser, getUser} from '../store/auth-slice';

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegistrationScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<undefined | string>();
  const [password, setPassword] = useState<undefined | string>();
  const [password2, setPassword2] = useState<undefined | string>();
  const [fullName, setFullName] = useState<undefined | string>();
  const [errorMessage, setErrorMessage] = useState<undefined | string>();

  const register = () => {
    setErrorMessage(undefined);

    // form input validation
    const errorText = inputValidation(email, fullName, password, password2);
    if (errorText) {
      setErrorMessage(errorText);
      setPassword(undefined);
      setPassword2(undefined);
      return;
    }

    if (email && password && fullName) {
      dispatch(createUser({email, password, fullName}))
        .unwrap()
        .then(userId =>
          dispatch(getUser(userId)).then(() => navigation.navigate('Main')),
        )
        .catch(err => {
          if (err === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            setErrorMessage('That email address is already in use!');
          }

          if (err === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setErrorMessage('That email address is invalid!');
          }

          setEmail('');
          setPassword('');
          setFullName('');
        });
    }
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
      <TextInput
        style={styles.input}
        onChangeText={setPassword2}
        value={password2}
        placeholder="Confirm password"
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
