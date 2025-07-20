import express, { Router } from 'express'
import { Request,Response } from "express";
import { loginController, registerController, updateUserController } from '../../DI/user/userInject';
import {authMiddleware} from '../../../adapters/middlewares/user/authMiddleware'




export class UserRoutes{

    public userRoutes:Router

    constructor(){
        this.userRoutes=Router()
        this.setRoutes()
    }
    private setRoutes(){
        this.userRoutes.post('/signup',(req:Request,res:Response)=>{
            registerController.register(req,res)
        })

        this.userRoutes.post('/login',(req:Request,res:Response)=>{
            loginController.login(req,res)
        })

        this.userRoutes.patch('/updateProfile',authMiddleware,(req:Request,res:Response)=>{
            updateUserController.updateUser(req,res)
        })
        }
    }
