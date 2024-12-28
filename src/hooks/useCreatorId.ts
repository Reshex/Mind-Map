import { AuthContext } from "@/context/CreatorContext";
import { useContext } from "react";

export function useCreatorId() {
  return useContext(AuthContext);
}
