import { createContext, useEffect, useReducer } from "react";
import {AuthReducer} from "./AuthReducer";
import React, { ReactNode } from "react";

interface State {
  currentUser: any; 
}

interface AuthContextType {
  currentUser: State["currentUser"];
  dispatch: React.Dispatch<any>; 
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const INITIAL_STATE: State = {
  currentUser: JSON.parse(localStorage.getItem("user")!) || null,
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: INITIAL_STATE.currentUser,
  dispatch: () => {}, 
});

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser])
  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;