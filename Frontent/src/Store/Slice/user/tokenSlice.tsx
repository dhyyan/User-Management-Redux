import { createSlice } from "@reduxjs/toolkit";



interface Token{
    token :string|null
}

const initialState :Token={
    token: null

}
const tokenSlice= createSlice({
    name:'token',
    initialState,
    reducers:{
        storeToken:(state,action)=>{
            state.token=action.payload
        },
        removeToken:(state)=>{
            state.token=null
        }
    }
})

export const {  storeToken,removeToken}=tokenSlice.actions
export default tokenSlice.reducer