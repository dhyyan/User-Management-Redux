import express, { Router } from 'express'



export class UserRoutes{
    
    public userRoutes:Router

    constructor(){
        this.userRoutes=Router()
        this.setRoutes()
    }
    private setRoutes(){
        this.userRoutes.get('/home',(req,res)=>{
            console.log("hhdgffgdgsk")
            res.send("kjhkug")

        })
    }
}