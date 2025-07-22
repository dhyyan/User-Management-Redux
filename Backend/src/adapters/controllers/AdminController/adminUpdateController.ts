import { Request, Response } from "express";
import { IUpdateUserUseCase } from "../../../domain/interface/IUsecaseInterface/admin/IUpdateUserUsecase";

export class AdminUpdateUser {
    private usecase
    constructor(usecase: IUpdateUserUseCase) {
        this.usecase = usecase
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        console.log("backen dparam id",req.params.id)
        if (!id) {
            res.status(400).json({ message: "update id is missing" })
        }
        const result = await this.usecase.findUser(id)
        if (!result) {
            res.status(400).json({ message: "data not found at this id" })
        }res.status(200).json({ message: "successfully finded user",userData:result})
    }

}