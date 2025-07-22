import { Request, Response } from "express";
import { IListUserUsecase } from "../../../domain/interface/IUsecaseInterface/admin/IListUserUsecase";

export class DashboardControler{
    private listUsecase
    constructor(listUsecase:IListUserUsecase){
        this.listUsecase=listUsecase
    }
    async listuserdata(req:Request,res:Response):Promise<void>{
        const result=await this.listUsecase.findAll()
        if(!result){
            res.status(400).json({message:"no users finded"})
        }
        res.status(200).json({message:"success fully finded", users:result})
    }
}