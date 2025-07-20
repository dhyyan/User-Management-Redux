import { Request, Response } from "express";
import { IupdateUserUsecase } from "../../../domain/interface/IUsecaseInterface/user/IUserUpdateUseCase";

export class UserUpdateController {
    private userUpdateUseCase
    constructor(userUpdateUseCase:IupdateUserUsecase){
        this.userUpdateUseCase=userUpdateUseCase
    }
    async updateUser(req:Request,res:Response):Promise<void> {
        const {userData}=req.body
        const result=await this.userUpdateUseCase.updateUser(userData)
        console.log("bknd result",result)
        if(!result){
            res.status(400).json({message:"Failed to update"})
        }
        res.status(200).json({message:"User Updated Successfully",user:result})
    }
}