import { User } from "../../../entities/User";

export interface IAdminAddUsecase{
    addUser(user:User):Promise<User|null>
}