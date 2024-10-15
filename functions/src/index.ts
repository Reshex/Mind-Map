import * as admin from "firebase-admin";
admin.initializeApp();
import { validateToken } from "./httpRequests";

// Export the validateToken function to be deployed as a Firebase Cloud Function
export { validateToken };

