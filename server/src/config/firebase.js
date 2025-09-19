import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json"; // place your service account JSON at this path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://<your-database-name>.firebaseio.com' // optional
});

export const firebaseAuth = admin.auth();
export default admin;