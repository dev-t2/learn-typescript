import firebase from 'firebase';

import options from '../../firebase.json';

type AuthType = { email: string; password: string };

const app = firebase.initializeApp(options);
const Auth = app.auth();

export const login = async ({ email, password }: AuthType) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);

  return user;
};

export const signup = async ({ email, password }: AuthType) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);

  return user;
};
