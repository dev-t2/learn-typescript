import firebase from 'firebase';

import options from '../../firebase.json';

type Login = { email: string; password: string };

const app = firebase.initializeApp(options);
const Auth = app.auth();

export const login = async ({ email, password }: Login) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);

  return user;
};
