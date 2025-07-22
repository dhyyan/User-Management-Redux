import { User } from "../../domain/entities/User";
import { IListUserUsecase } from "../../domain/interface/IUsecaseInterface/admin/IListUserUsecase";
import { IUserRepository } from "../../domain/interface/IUsecaseInterface/user/IUserRepository";

export default class ListUsecase implements IListUserUsecase{
    private repo
    constructor(repo:IUserRepository){
        this.repo=repo
    }
    async findAll(): Promise<User[] | null> {
        try {
            const datas=await this.repo.findAll()
            if(!datas){
                throw new Error("no users find")
            }
            return datas
        } catch (error) {
            return null
        }
    }
    
}