import { createSlice } from "@reduxjs/toolkit"


interface Token{
    
    token :string|null
}

const initialState :Token={
    token: null

}

const adminToken =createSlice({
    name: "adminToken",
    initialState,
    reducers:{
        storeAdminToken:(state,action)=>{
            state.token=action.payload
        },
        removeAdminToken:(state)=>{
            state.token=null
        }
    }
})

export const {storeAdminToken,removeAdminToken}=adminToken.actions
export default adminToken.reducer