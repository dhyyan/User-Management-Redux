import { User } from "../../../entities/User";

export interface IupdateUserUsecase{
    updateUser(user:User):Promise<User|null>
}