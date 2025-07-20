import { User } from "../../../entities/User";


export interface ILoginUseCase{
loginUser(email: string, password: string): Promise<{ data:User , Accesstoken:string,RefreshToken:string} | null>
}