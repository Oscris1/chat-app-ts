import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorMessageBox = ({errorMessage}) => {
  return (
    <View style={styles.errorMessage}>
      <Text style={styles.errorMessageText}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 30,
    borderWidth: 1,
    borderColor: '#FF4C29',
    backgroundColor: '#FFE6E6',
    marginVertical: 10,
  },
  errorMessageText: {
    color: '#FF4C29',
  },
});

export default ErrorMessageBox;