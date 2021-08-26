import {createSlice, createAsyncThunk, isDraft} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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

interface SignUpCredentials {
  email: string;
  password: string;
  fullName: string;
}

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (signUpCredentials: SignUpCredentials, {rejectWithValue}) => {
    const {email, password, fullName} = signUpCredentials;
    // create user in auth
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      // create User's doc
      const createdUser = await firestore()
        .collection('Users')
        .doc(user.user.uid)
        .set({
          id: user.user.uid,
          email: email,
          username: fullName,
        });
      return user.user.uid;
    } catch (err) {
      return rejectWithValue(err.code);
    }
  },
);

interface AuthState {
  logged: boolean;
  fromRegister: boolean;
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
  fromRegister: false,
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
