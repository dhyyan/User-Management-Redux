import { User } from "../../../entities/User";

export interface IAdminLoginUseCase{
login(email: string, password: string): Promise<{existing:User,Accesstoken:string }| null>}