import { User } from "../../../entities/User";


export interface IUpdateUserUseCase{
    findUser(id:string):Promise<User|null>
}