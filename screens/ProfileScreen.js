import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';

import {logOutState} from '../store/auth-slice';

import {useSelector, useDispatch} from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState();

  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: false,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('LogIn');
        dispatch(logOutState());
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.changePhotoBox} onPress={choosePhoto}>
        {image ? (
          <Image
            style={styles.previewImage}
            source={{
              uri: image,
            }}
          />
        ) : (
          <Text style={styles.changePhotoBoxText}>Press to change image</Text>
        )}
      </TouchableOpacity>

      <View style={styles.decisionButtonsContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => console.log('accept')}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => console.log('cancel')}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Button onPress={logOut} title="Log out" color="#AFBBF2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  changePhotoBox: {
    marginTop: 30,
    width: 200,
    height: 200,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#082032',
    borderRadius: 10,
    width: '70%',
    margin: 2,
    overflow: 'hidden',
  },
  changePhotoBoxText: {
    color: '#fff',
    fontSize: 18,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  decisionButtonsContainer: {
    marginTop: 10,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  acceptButton: {
    width: '45%',
    backgroundColor: '#7FC8A9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 5,
  },
  acceptButtonText: {
    fontWeight: '700',
  },
  cancelButton: {
    width: '45%',
    backgroundColor: '#FA8072',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 5,
  },
  cancelButtonText: {
    fontWeight: '700',
  },
});

export default ProfileScreen;
