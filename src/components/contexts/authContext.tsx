"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { IUser } from "../../../types";
import jwtDecode from "jwt-decode";

export const AuthContext = React.createContext<{
  user: IUser;
  signOut: () => void;
  initiateUserSession: Function;
}>({
  user: {
    id: "",
    prenom: "",
    nom: "",
    email: "",
    role: "",
    token: "",
  },
  signOut: () => null,
  initiateUserSession: (token: string, user: IUser) => null,
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser>({
    id: "",
    prenom: "",
    nom: "",
    email: "",
    role: "",
    token: "",
  });
  useEffect(() => {
    let isSubsribed: boolean = true;
    const init = () => {
      if (isSubsribed) {
        
        const userGot = JSON.parse(localStorage.getItem("user")!);
        if (userGot) {

          setUser((user) => ({ ...user,id:userGot?.id,nom:userGot.nom,email:userGot.email,role:userGot.role,token:userGot.token}));
        } else {
          localStorage.removeItem("user");
          setUser({
            id: "",
            prenom: "",
            nom: "",
            email: "",
            role: "",
            token: "",
          });
        }
      }
    };

    init();

    return () => {
      isSubsribed = false;
    };
  }, []);

  const initiateUserSession = useCallback((token: string) => {
    let userGot: any = jwtDecode(token);
  

    if (userGot)
      setUser((user) => ({
        ...user,
        id:userGot.id,
        nom: userGot?.nom,
        prenom: userGot?.prenom || "",
        email: userGot?.email,
        token,
        role: userGot?.role?.[0]?.authority,
      }));
    window.localStorage.setItem("user", JSON.stringify({
        ...user,
        id:userGot.id,
        nom: userGot?.nom,
        prenom: userGot?.prenom || "",
        email: userGot?.email,
        token,
        role: userGot?.role?.[0]?.authority,
      }));
  },[user])
  const signOut = () => {
    localStorage.removeItem("user");
          setUser({
            id: "",
            prenom: "",
            nom: "",
            email: "",
            role: "",
            token: "",
          });
  };
  const value = useMemo(() => ({ user, signOut, initiateUserSession }), [user,initiateUserSession]);

  return <AuthContext.Provider value={value}>{children};</AuthContext.Provider>;
}
