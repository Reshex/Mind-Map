import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useCreatorId() {
  return useContext(AuthContext);
}
