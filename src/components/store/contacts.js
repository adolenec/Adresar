import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  selectedContact: {},
  isEditingContact: false,
  rerender: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    setSelectedContact(state, action) {
      state.selectedContact = action.payload;
    },
    setIsEditingContact(state, action) {
      state.isEditingContact = action.payload;
    },
    rerender(state) {
      state.rerender = !state.rerender;
    },
  },
});

export default contactsSlice;
export const contactsActions = contactsSlice.actions;
