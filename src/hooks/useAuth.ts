// import { useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "@/firebase";

// function useAuth() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   return { user, loading };
// }

// export default useAuth;

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const tokenExpirationTime = localStorage.getItem("tokenExpiration");
        const currentTime = Date.now();

        if (tokenExpirationTime && currentTime > Number(tokenExpirationTime)) {
          auth.signOut();
          localStorage.removeItem("tokenExpiration");
          setUser(null);
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}

export default useAuth;
