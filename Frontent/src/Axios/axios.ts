import axios from "axios";
import store from "../Store/store";



export const api = axios.create({
    baseURL:"http://localhost:3000/"
})


api.interceptors.request.use((req)=>{
    const token = store.getState().userToken.token;
    if(token){
        req.headers.Authorization=`Bearer ${token}`
    }
    return req
},
(error)=>{
    return Promise.reject(error)
})

// api.interceptors.response.use


