import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Store/Slice/user/authSlice'
import tokenReducer from '../Store/Slice/user/tokenSlice'


export const store = configureStore({
    reducer:{
        auth:userReducer,
        userToken:tokenReducer
    }
})

export default store
// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

