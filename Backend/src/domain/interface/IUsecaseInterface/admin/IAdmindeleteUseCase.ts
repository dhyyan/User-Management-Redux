import { User } from "../../../entities/User";

export interface IadminDeleteUseCase{
    userDelete(id:string):Promise<User|null>
}