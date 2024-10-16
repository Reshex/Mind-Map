import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.onUserDelete = functions.auth.user().onDelete(async (user: functions.auth.UserRecord) => {
  const uid = user.uid;

  try {
    const userDocRef = admin.firestore().collection("users").doc(uid);
    await userDocRef.delete();
    console.log(`Successfully deleted user data for UID: ${uid}`);
  } catch (error) {
    console.error(`Error deleting user data for UID: ${uid}`, error);
  }
});
