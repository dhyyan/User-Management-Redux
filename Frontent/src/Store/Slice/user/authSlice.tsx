import { createSlice } from "@reduxjs/toolkit";
import type User from "../../../types/User";


interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: null
}
const authslice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        removeUser:(state)=>{
            state.user=null
        }
    }
})

export const {addUser,removeUser}=authslice.actions
export default authslice.reducer