import { User } from "../../domain/entities/User";
import { IUpdateUserUseCase } from "../../domain/interface/IUsecaseInterface/admin/IUpdateUserUsecase";
import { IUserRepository } from "../../domain/interface/IUsecaseInterface/user/IUserRepository";

export class UpdateUserUseCase implements IUpdateUserUseCase{
    private repo
    constructor(repo:IUserRepository){
        this.repo=repo
    }
    async findUser(id: string): Promise<User | null> {
        if(!id){
            throw new Error("update user id is missing")
        }
        const data=await this.repo.findUserById(id)
        
        if(!data){
            throw new Error("there was no user at this id")
        }
        return data
    }
    
}