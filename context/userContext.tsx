import React, { createContext, useEffect, useState } from "react";

type State = {
  userDocument: string;
};

type UserContextType = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

export const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: any) => {
  const initialState: State = {
    userDocument: "boy",
  };
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    setState("girl");
  }, []);

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};
