import {getUser} from '../store/auth-slice';
import {AppDispatch} from '../store/index';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const loginHandler = (
  user: FirebaseAuthTypes.User,
  dispatch: AppDispatch,
) => {
  const freshAccount =
    user.metadata.creationTime &&
    Date.now() - Date.parse(user.metadata.creationTime) < 15000;

  // TO DO -> find another solution
  if (freshAccount) {
    setTimeout(() => {
      dispatch(getUser(user.uid));
    }, 2000); // wait 2 seconds for doc creation
  } else {
    dispatch(getUser(user.uid));
  }
};
