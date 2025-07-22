import axios from "axios"
import store from "../Store/store"

export const api = axios.create({
    baseURL:"http://localhost:3000/"
})


api.interceptors.request.use((req)=>{
    try {
        const token= store.getState().adminToken.token
        if(token){
            req.headers.Authorization=`Bearer ${token}`
        }
        return req
        
    } catch (error) {
        return Promise.reject(error)
    }
    
})