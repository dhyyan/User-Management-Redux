import { User } from "../../../entities/User";

export interface IRegesterInterface{
    createUser(user:User):Promise<User|null>
}