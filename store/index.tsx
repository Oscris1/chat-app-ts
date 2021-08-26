import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import {useDispatch} from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
