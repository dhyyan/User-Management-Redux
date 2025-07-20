import { User } from "../../domain/entities/User";
import { IRegesterInterface } from "../../domain/interface/IUsecaseInterface/user/IUseCaseRegisterInterface";
import { IUserRepository } from "../../domain/interface/IUsecaseInterface/user/IUserRepository";
import bcrypt from 'bcrypt'

export class UseCaseRegister implements IRegesterInterface {
    private repo
    constructor(repo: IUserRepository) {
        this.repo = repo;
    }
    
    async createUser(user: User): Promise<User | null> {
        if (!user.email || !user.password) {
            throw new Error("Email and Password are Required")
        }
        const exist = await this.repo.findUserByEmail(user.email)
        if (exist) {
            throw new Error("Email already exist")
        }
        const hashPassword = await bcrypt.hash(user.password,10)
        const result = await this.repo.createUser({...user,password:hashPassword})
        return result

    }
}
