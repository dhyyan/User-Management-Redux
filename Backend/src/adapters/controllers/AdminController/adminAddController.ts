import { Request, Response } from "express";
import { IAdminAddUsecase } from "../../../domain/interface/IUsecaseInterface/admin/IAdminAddUseCase";

export class AdminAddController{
    private addUsecase
    constructor(addUsecase:IAdminAddUsecase){
        this.addUsecase=addUsecase
    }

    async addUser(req:Request,res:Response):Promise<void>{
        try {
            const user=req.body.userData
            console.log("add userdata cnt",user)
            console.log("aaa",user.password)
            if(!user){
                res.status(400).json({message:"no data founded"})
            }
            const result= await this.addUsecase.addUser({...user})
            if(!result){
                res.status(400).json({message:"user created not successfuly try angan later"})
            }
            res.status(200).json({message:"success fully created"})
        } catch (error) {
            
        }

    }
}