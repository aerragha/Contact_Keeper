import React, { useReducer } from "react";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../Types";
import AlertContext from "./AlertContext";
import { v4 as uuidv4 } from "uuid";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set alert
  const setAlert = (msg, type) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        type,
        id,
      },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
