import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export function useCreatorId() {
  return useContext(AuthContext);
}
