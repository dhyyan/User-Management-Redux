import { Request, Response } from "express";
import { IadminDeleteUseCase } from "../../../domain/interface/IUsecaseInterface/admin/IAdmindeleteUseCase";

export class AdminDeleteController{
    private deleteUsecase
    constructor(deleteUsecase:IadminDeleteUseCase){
        this.deleteUsecase=deleteUsecase
    }
    async deleteUser(req:Request,res:Response):Promise<void>{
        const id= req.params.id
        console.log("controller received params id",id)
        const result = await this.deleteUsecase.userDelete(id)
        if(!result){
            res.status(400).json({message:"user not founded"})
        }
        res.status(200).json({message:"successfully deleted"})
    }
}