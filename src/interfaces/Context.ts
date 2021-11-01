import { ReactChild } from "react";
// import { Todo } from "./Todo";

export interface StoreProps {
  initialState: Object;
  reducer: any;
  children: ReactChild;
}

export interface ActionType {
  type: string;
  payload: Array<any> | any;
}
