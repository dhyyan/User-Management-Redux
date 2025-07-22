import { createSlice } from "@reduxjs/toolkit";
import type User from "../../../types/User";


interface Adminauth {
    admin: User | null
}

const initialState: Adminauth = {
    admin: null
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        addAdmin: (state, action) => {
            state.admin = action.payload
        },
        removeAdmin: (state, action) => {
            state.admin = null
        }
    }

})

export const { addAdmin, removeAdmin } = adminSlice.actions
export default adminSlice.reducer