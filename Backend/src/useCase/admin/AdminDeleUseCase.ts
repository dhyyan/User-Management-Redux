import { error } from "console";
import { IadminDeleteUseCase } from "../../domain/interface/IUsecaseInterface/admin/IAdmindeleteUseCase";
import { IUserRepository } from "../../domain/interface/IUsecaseInterface/user/IUserRepository";
import { User } from "../../domain/entities/User";

export class AdminDeleteUsecase implements IadminDeleteUseCase{
    private repo
    constructor(repo:IUserRepository){
        this.repo=repo
    }
    async userDelete(id: string): Promise<User|null> {
        if(!id){
            throw new Error("Deleteing user id is missing")
        }
        try {
            const deleted=await this.repo.findByIdAndDelete(id)
            return deleted
        } catch (error) {
            console.log("error in delet useCase",error)
            return null
        }
    }
    
}