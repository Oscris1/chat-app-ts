import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const getUser = createAsyncThunk('auth/getUser', async userId => {
  console.log(userId);
  const data = await firestore()
    .collection('Users')
    .doc(userId)
    .get()
    .then(userData => {
      console.log(userData.data());
      return userData.data();
    });
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: null,
    logged: false,
    userData: {
      id: null,
      email: null,
      username: null,
      avatar: null,
    },
  },
  reducers: {
    logOutState(state, action) {
      state.logged = false;
      state.userData.id = null;
      state.userData.email = null;
      state.userData.username = null;
      state.userData.avatar = null;
      state.status = null;
    },
    updatePhotoState(state, {payload}) {
      //photo state
      state.userData.avatar = payload.avatar;
    },
  },
  extraReducers: {
    [getUser.pending]: state => {
      state.status = 'loading';
    },
    [getUser.fulfilled]: (state, {payload}) => {
      state.logged = true;
      state.userData.id = payload.id;
      state.userData.email = payload.email;
      state.userData.username = payload.username;
      state.userData.avatar = payload.avatar;
      state.status = 'success';
    },
    [getUser.rejected]: state => {
      state.status = 'failed';
    },
  },
});

export const {logOutState, updatePhotoState} = authSlice.actions;
export default authSlice;
