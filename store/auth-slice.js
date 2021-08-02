import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: false,
    userData: {
      id: undefined,
      email: undefined,
    },
  },
  reducers: {
    logIn(state, action) {
      state.logged = true;
      state.userData.id = action.payload.uid;
      state.userData.email = action.payload.email;
    },
    logOutState(state, action) {
      state.logged = false;
      state.userData.id = undefined;
      state.userData.email = undefined;
    },
  },
});

export const {logIn, logOutState} = authSlice.actions;
export default authSlice;
