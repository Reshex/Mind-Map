import { Map } from "../mapTypes/mapType";

export default interface User {
  name: string | null;
  lastName: string | null;
  email: string | null;
  map?: Map[];
}
