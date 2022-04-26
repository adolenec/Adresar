import { createSlice } from "@reduxjs/toolkit";

const initialState = {contactsData : [], selectedItemId: null}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts(state, action){
            state.contactsData = action.payload;
        },
        setSelectedItemId(state,action){
            state.selectedItemId = action.payload;
        }
    }
})

export default contactsSlice;
export const contactsActions = contactsSlice.actions;