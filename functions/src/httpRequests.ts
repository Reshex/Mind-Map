import * as functions from "firebase-functions";

export function validateToken() {
  functions.https.onRequest(async (req, res) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      // Verify the token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(token);
      return res.status(200).json({ message: "Token is valid", uid: decodedToken.uid });
    } catch (error) {
      return res.status(403).json({ error: "Invalid token" });
    }
  });
}
