import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const LogInScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Log In</Text>
      <Button
        onPress={() => navigation.navigate('Register')}
        title="Register screen"
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

export default LogInScreen;
