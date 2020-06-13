import React, { createContext, useReducer, useEffect } from "react";
import reducer from "./../reducers/userReducer";

export const AuthContext = createContext(null);
export const DispatchContext = createContext(null);

const AuthProvider = (props) => {
  const defaultVal = { token: "" };
  const [Data, dispatch] = useReducer(reducer, defaultVal, () => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem("token") || String(defaultVal)
      );
    } catch (e) {
      value = defaultVal;
    }
    return value;
  });

  useEffect(() => {
    window.localStorage.setItem("token", JSON.stringify(Data));
  }, [Data]);

  return (
    <AuthContext.Provider value={Data}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
