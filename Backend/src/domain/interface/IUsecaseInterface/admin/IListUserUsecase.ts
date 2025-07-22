import { User } from "../../../entities/User";

export interface IListUserUsecase{
    findAll():Promise<User[]|null>
}