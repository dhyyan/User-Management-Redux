import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interface/IUsecaseInterface/user/IUserRepository";
import { IupdateUserUsecase } from "../../domain/interface/IUsecaseInterface/user/IUserUpdateUseCase";


export class UpdateUserUsecas implements IupdateUserUsecase{
    private repo
    constructor(repo:IUserRepository){
        this.repo=repo
    }
    async updateUser(userData:User): Promise<User | null> {
        const user=await this.repo.findUserByEmail(userData.email)
        console.log("edit user",user)
        if (!user){
            throw new Error("User not found or update failed");
        }
        
        const update = await this.repo.updateUser(user.id?.toString()!,userData)
        return update
    }

}