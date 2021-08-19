import {getUser} from '../store/auth-slice';

export const loginHandler = (user, dispatch) => {
  const freshAccount = Date.now() - user._user.metadata.creationTime < 15000;

  // TO DO -> find another solution
  if (freshAccount) {
    setTimeout(() => {
      dispatch(getUser(user._user.uid));
    }, 2000); // wait 2 seconds for doc creation
  } else {
    dispatch(getUser(user._user.uid));
  }
};
