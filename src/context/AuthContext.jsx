import { useEffect, useState } from "react";
import {
  getUser,
  handleAuthCallback,
  login,
  logout as netlifyLogout,
  onAuthChange,
  signup,
} from "@netlify/identity";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    const currentUser = await login(email, password);
    setUser(currentUser);
    return currentUser;
  };

  const signUp = async (email, password, name) => {
    const currentUser = await signup(email, password, { full_name: name });

    if (currentUser.emailVerified) {
      setUser(currentUser);
    }

    return currentUser;
  };

  const logout = async () => {
    await netlifyLogout();
    setUser(null);
  };

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthChange((_event, currentUser) => {
      if (active) setUser(currentUser);
    });

    const restoreSession = async () => {
      try {
        const callback = await handleAuthCallback();
        const currentUser = callback?.user || (await getUser());
        if (active) setUser(currentUser);
      } catch {
        const currentUser = await getUser();
        if (active) setUser(currentUser);
      } finally {
        if (active) setLoading(false);
      }
    };

    restoreSession();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = { user, signIn, signUp, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
