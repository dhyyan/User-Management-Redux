import { User } from "../../../domain/entities/User";
import userModal from '../../../framework/database/models/userSchema'
import { IUserRepository } from "../../../domain/interface/IUsecaseInterface/user/IUserRepository";


export class UserRepository implements IUserRepository{
    findByIdAndDelete(id: string): Promise<User|null> {
        return userModal.findByIdAndDelete(id)
    }
    async createUser(user: User): Promise<User> {
        console.log("fuckkk")
        return userModal.create(user)
    }
    async findUserByEmail(email: string): Promise<User | null> {
        return userModal.findOne({email})
    }
    async findUserById(id: string): Promise<User | null> {
        return userModal.findById(id)
    }
    async updateUser(id: string, user: Partial<User>): Promise<User | null> {
        return userModal.findByIdAndUpdate(id,user,{new:true})
    }
    async findAll():Promise<User[]|null>{
    return userModal.find({role:"user"});
    }

}