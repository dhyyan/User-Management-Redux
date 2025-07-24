import { User } from "../../domain/entities/User";
import { IAdminAddUsecase } from "../../domain/interface/IUsecaseInterface/admin/IAdminAddUseCase";
import { IUserRepository } from "../../domain/interface/IUsecaseInterface/user/IUserRepository";
import bcrypt from 'bcrypt'

export class AdminAddUseCase implements IAdminAddUsecase {
    private repo
    constructor(repo: IUserRepository) {
        this.repo = repo
    }
    async addUser(user: User): Promise<User | null> {
        if (!user || !user.password) {
            throw new Error("User details or password missing");
        }
        console.log("add user get in useCase", user)
        
        try {
            const exist = await this.repo.findUserByEmail(user.email)
            console.log("existt", exist)
            if (exist) {
                throw new Error("User in this email already exist")
            }
            console.log("pass",user.password)
            const hashPassword = await bcrypt.hash(user.password, 10)
            console.log("hashh", hashPassword)
            const data = await this.repo.createUser({ ...user, password: hashPassword })
            console.log("created data", data)
            return data

        } catch (error) {
            console.log("error in add admin user", error)
            return null
        }
    }

}