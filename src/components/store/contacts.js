import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  isEditingContact: false,
  rerender: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  selectedContact: {},
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    rerender(state) {
      state.rerender = !state.rerender;
    },
    showEditModal(state, action) {
      state.isEditModalOpen = true;
      state.selectedContact = action.payload;
      state.isEditingContact = true;
    },
    hideEditModal(state) {
      state.isEditModalOpen = false;
      state.isEditingContact = false;
    },
    showDeleteModal(state, action) {
      state.isDeleteModalOpen = true;
      state.selectedContact = action.payload;
    },
    hideDeleteModal(state) {
      state.isDeleteModalOpen = false;
    },
  },
});

export default contactsSlice;
export const contactsActions = contactsSlice.actions;
