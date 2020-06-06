import React, { useReducer } from "react";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTRE_CONTACT,
  CLEAR_FILTRE,
  CONTACT_ERROR,
  GET_CONTACT,
  CLEAR_CONTACT,
} from "../Types";
import axios from "axios";
import contactContext from "./ContactContext";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get Contacts
  const getContact = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({
        type: GET_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear contact
  const clearContact = () => {
    dispatch({
      type: CLEAR_CONTACT,
    });
  };

  // delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // set current contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  // clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(`/api/contacts`, contact, config);
      dispatch({
        type: UPDATE_CONTACT,
        payload: contact,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // filtre contact
  const filterContact = (text) => {
    dispatch({
      type: FILTRE_CONTACT,
      payload: text,
    });
  };

  // clear filtre
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTRE,
    });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContact,
        clearContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
