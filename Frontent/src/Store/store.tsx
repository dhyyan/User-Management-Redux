import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Store/Slice/user/authSlice'
import tokenReducer from '../Store/Slice/user/tokenSlice'
import adminTokenReducer from '../Store/Slice/admin/tokenSlice'
import adminReducer from '../Store/Slice/admin/adminSlice'



export const store = configureStore({
    reducer:{
        auth:userReducer,
        userToken:tokenReducer,
        adminAuth:adminReducer,
        adminToken:adminTokenReducer
    }
})

export default store
// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

