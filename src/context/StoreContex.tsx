import React, { createContext, useReducer, useContext } from "react";
import { StoreProps } from "../interfaces/Context";

const StoreContext = createContext<any>(null);

export const StoreProvider = (props: StoreProps) => {
  return (
    <StoreContext.Provider
      value={useReducer(props.reducer, props.initialState)}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
