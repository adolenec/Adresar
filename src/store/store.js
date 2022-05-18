import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import contactsSlice from "./contacts";

const store = configureStore({
    reducer: {auth: authSlice.reducer, contacts: contactsSlice.reducer}
});

export default store;