import { Request, Response } from "express";
import { IAdminLoginUseCase } from "../../../domain/interface/IUsecaseInterface/admin/IAdminLoginUsecase";


export class AdminLogin{
    private loginUsecase
    constructor(loginUsecase:IAdminLoginUseCase){
        this.loginUsecase=loginUsecase
    }
    async login(req:Request,res:Response):Promise<void>{
        
        try {
            console.log('kkkkkkkkkkkkkk')
            const {adminData}=req.body
            console.log("adminDataCntrl",adminData)
            const result=await this.loginUsecase.login(adminData.email,adminData.password)
            if(!result){
                res.status(400).json({messag:"admin not found"})
            }
            res.status(200).json({message:"Admin Login succesfully",admin:result?.existing,token:result?.Accesstoken})
            
        } catch (error) {
            console.log(error)
        }
    }
}