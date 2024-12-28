import { createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext<string | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [creatorId, setCreatorId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCreatorId(user.uid);
      } else {
        setCreatorId(null);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={creatorId}>{children}</AuthContext.Provider>;
}


