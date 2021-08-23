import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (userId: string) => {
    const data = await firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(userData => {
        return userData.data();
      });
    return data;
  },
);

interface AuthState {
  logged: boolean;
  status: 'idle' | 'loading' | 'success' | 'failed';
  userData: {
    id: string | undefined;
    email: string | undefined;
    username: string | undefined;
    avatar: string | undefined;
  };
}

const initialState = {
  status: 'idle',
  logged: false,
  userData: {
    id: undefined,
    email: undefined,
    username: undefined,
    avatar: undefined,
  },
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOutState(state) {
      state.logged = false;
      state.userData.id = undefined;
      state.userData.email = undefined;
      state.userData.username = undefined;
      state.userData.avatar = undefined;
      state.status = 'idle';
    },
    updatePhotoState(state, {payload}) {
      //photo state
      state.userData.avatar = payload.avatar;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      state.status = 'loading';
    }),
      builder.addCase(getUser.fulfilled, (state, {payload}) => {
        state.logged = true;
        state.userData.id = payload?.id;
        state.userData.email = payload?.email;
        state.userData.username = payload?.username;
        state.userData.avatar = payload?.avatar;
        state.status = 'success';
      }),
      builder.addCase(getUser.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {logOutState, updatePhotoState} = authSlice.actions;
export default authSlice;
