import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

import {useSelector} from 'react-redux';

const ImageSelector = () => {
  const [image, setImage] = useState();
  const authData = useSelector(state => state.auth);
  const reference = storage().ref(`/avatars/${authData.userData.id}.jpg`);

  // Select photo from gallery
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: false,
    }).then(image => {
      setImage(image.path);
      {
        // Try it later
        /**  const profileImageRef = `${authData.userData.id}.${
        image.mime.split('/')[1]
      }`;
      reference = storage().ref(`/avatars/${profileImageRef}`);
      */
      }
    });
  };

  // Send image to firebase storage and update it's url in the user database object
  const uploadImage = async () => {
    //Send image to firebase storage
    const task = await reference.putFile(image);
    setImage();

    // retreive image url
    const url = await reference.getDownloadURL();

    // update avatar field
    console.log(url);
    firestore()
      .collection('Users')
      .doc(authData.userData.id)
      .update({
        avatar: url,
      })
      .then(() => {
        console.log('Avatar updated!');
      });
  };

  return (
    <View style={styles.container}>
      {/** Choose image button */}
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

      {/** Display decision container if photo is selected */}
      {image && (
        <View style={styles.decisionContainer}>
          {/** Change avatar question */}
          <Text>Do you want to change your profile picture?</Text>
          <View style={styles.decisionButtonsContainer}>
            {/** Accept button */}
            <TouchableOpacity style={styles.acceptButton} onPress={uploadImage}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>

            {/** Cancel button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setImage()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  changePhotoBox: {
    width: '70%',
    height: 200,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#082032',
    borderRadius: 10,
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
  decisionContainer: {
    marginTop: 10,
    width: '70%',
  },
  decisionButtonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
export default ImageSelector;
