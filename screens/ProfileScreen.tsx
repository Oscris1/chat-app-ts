import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useAppDispatch} from '../store/index';
import {MainScreenNavigationProp} from '../navigation/RootNavigator';

import {signOut} from '../store/auth-slice';
import ImageSelector from '../components/ImageSelector';

type Props = {
  navigation: MainScreenNavigationProp;
};

const ProfileScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(signOut());
  };

  return (
    <View style={styles.container}>
      <ImageSelector />
      {/* LogOut Button */}
      <TouchableOpacity style={styles.blackButton} onPress={logOut}>
        <Text style={styles.blackButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  blackButton: {
    position: 'absolute',
    bottom: 0,
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
});

export default ProfileScreen;
