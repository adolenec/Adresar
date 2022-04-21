import { createSlice } from "@reduxjs/toolkit";

const initialState = {contactsData : []}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts(state, action){
            state.contactsData = action.payload;
        }
    }
})

export default contactsSlice;
export const contactsActions = contactsSlice.actions;