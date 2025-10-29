import admin from "firebase-admin";

let firebaseAuth = null;

try {
  const serviceAccount = await import("../services/serviceAccountKey.json", { with: { type: "json" } });
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
  });
  firebaseAuth = admin.auth();
  console.log("Firebase initialized successfully");
} catch (error) {
  console.log("Firebase not configured - authentication will use local methods only");
  console.log("To enable Firebase auth, add serviceAccountKey.json file");
}

export { firebaseAuth };
export default admin;