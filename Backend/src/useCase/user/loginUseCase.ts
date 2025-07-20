import { User } from "../../domain/entities/User";
import { IJWTService } from "../../domain/interface/IServiceInterface/IJwtServise";
import { ILoginUseCase } from "../../domain/interface/IUsecaseInterface/user/IUseCaseLogin";
import { IUserRepository } from "../../domain/interface/IUsecaseInterface/user/IUserRepository";
import dotenv from 'dotenv'
dotenv.config()


export class LoginUseCase implements ILoginUseCase {
    private repo
    private jwt
    constructor(repo: IUserRepository, jwt: IJWTService) {
        this.jwt = jwt
        this.repo = repo
    }

    async loginUser(email: string, password: string): Promise<{ data: User, Accesstoken: string, RefreshToken: string } | null> {
        if (!email || !password) {
            throw new Error("Email and password required");
        }
        const data = await this.repo.findUserByEmail(email)
        if (!data) {
            throw new Error("User in this eamil Not found");
        }
        const accessToken = process.env.ACCESS_SECRECT_KEY as string
        const refreshToken = process.env.REFRESH_SECRECT_KEY as string

        const Accesstoken = this.jwt.createAccessToken(accessToken, String(data?.id), data.role)
        const RefreshToken = this.jwt.createRefreshTokem(refreshToken, data.role)
        return { data, Accesstoken, RefreshToken }
    }
}