import React, { createContext, useState } from "react";

type State = {
  isLoggedIn: boolean;
  isLoginPending: boolean;
  loginError: any;
};

type UserContextType = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

export const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: any) => {
  const initialState: State = {
    isLoggedIn: false,
    isLoginPending: false,
    loginError: null,
  };
  const [state, setState] = useState<State>(initialState);

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};
