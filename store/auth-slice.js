import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const getUser = createAsyncThunk('auth/getUser', async userId => {
  const promise = firestore()
    .collection('Users')
    .doc(userId)
    .get()
    .then(userData => {
      return userData.data();
    });
  const data = await promise;
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: null,
    logged: false,
    userData: {
      id: undefined,
      email: undefined,
      username: undefined,
      avatar: undefined,
    },
  },
  reducers: {
    logOutState(state, action) {
      state.logged = false;
      state.userData.id = undefined;
      state.userData.email = undefined;
      state.userData.username = undefined;
      state.userData.avatar = undefined;
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
