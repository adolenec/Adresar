import { createSlice } from "@reduxjs/toolkit";

const initialState = {contactsData : [], deleteItemId: null}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts(state, action){
            state.contactsData = action.payload;
        },
        setDeleteItemId(state,action){
            state.deleteItemId = action.payload;
        }
    }
})

export default contactsSlice;
export const contactsActions = contactsSlice.actions;