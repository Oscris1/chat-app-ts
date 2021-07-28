import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const RegistrationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button
        onPress={() => navigation.navigate('LogIn')}
        title="Login Screen"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
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
});

export default RegistrationScreen;
