import admin from 'firebase-admin';
import serviceAccount from '../../path/to/your/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAuth = admin.auth();

export const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const userRecord = await firebaseAuth.createUser({
      email,
      password,
    });
    return userRecord;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userRecord = await firebaseAuth.getUserByEmail(email);
    return userRecord;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    await firebaseAuth.generatePasswordResetLink(email);
  } catch (error) {
    throw new Error(error.message);
  }
};