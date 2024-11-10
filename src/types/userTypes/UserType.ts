import { FieldValue } from "firebase/firestore";
import { Map } from "../mapTypes/mapType";

export default interface User {
  name: string | null;
  lastName: string | null;
  email: string | null;
  maps?: Map[] | FieldValue;
}
