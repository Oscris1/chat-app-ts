import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {RootState} from './index';

export const getUser = createAsyncThunk<
  FirebaseFirestoreTypes.DocumentData,
  string,
  {state: RootState}
>(
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
  {
    condition: (userId, {getState}) => {
      const {auth} = getState();
      if (auth.fromUserInteraction) {
        return false;
      }
    },
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
    try {
      // create user in auth
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

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const logout = await auth().signOut();
  console.log('logged out');
  return logout;
});

interface SignInCredentials {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (signInCredentials: SignInCredentials, {rejectWithValue}) => {
    try {
      const {email, password} = signInCredentials;
      const user = await auth().signInWithEmailAndPassword(email, password);
      return user.user.uid;
    } catch (err) {
      return rejectWithValue(err.code);
    }
  },
);

interface AuthState {
  logged: boolean;
  fromUserInteraction: boolean;
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
  fromUserInteraction: false,
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
    // getUser
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
      }),
      // createUser
      builder.addCase(createUser.fulfilled, state => {
        state.fromUserInteraction = false;
      }),
      builder.addCase(createUser.pending, state => {
        state.fromUserInteraction = true;
      }),
      builder.addCase(createUser.rejected, state => {
        state.fromUserInteraction = false;
      }),
      // signIn
      builder.addCase(signIn.fulfilled, state => {
        state.fromUserInteraction = false;
      }),
      builder.addCase(signIn.pending, state => {
        state.fromUserInteraction = true;
      }),
      builder.addCase(signIn.rejected, state => {
        state.fromUserInteraction = false;
      }),
      // signOut
      builder.addCase(signOut.fulfilled, state => {
        state.logged = false;
        state.userData.id = undefined;
        state.userData.email = undefined;
        state.userData.username = undefined;
        state.userData.avatar = undefined;
        state.status = 'idle';
      });
  },
});

export const {logOutState, updatePhotoState} = authSlice.actions;
export default authSlice;
