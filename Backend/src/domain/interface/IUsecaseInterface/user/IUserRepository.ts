import { User } from "../../../entities/User"


export interface IUserRepository{
    createUser(user:User):Promise<User>,
    updateUser(id:string, user:Partial<User>):Promise<User | null>,
    findUserByEmail(email:string):Promise<User | null>
    findUserById(id:string):Promise<User | null>
    findAll():Promise<User[]|null>
    findByIdAndDelete(id:string):Promise<User|null>
}