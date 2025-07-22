import { User } from "../../domain/entities/User";
import { IJWTService } from "../../domain/interface/IServiceInterface/IJwtServise";
import { IAdminLoginUseCase } from "../../domain/interface/IUsecaseInterface/admin/IAdminLoginUsecase";
import { IUserRepository } from "../../domain/interface/IUsecaseInterface/user/IUserRepository";
import bcrypt from 'bcrypt'

export class AdminLoginUsecase implements IAdminLoginUseCase {
    private repo
    private jwt
    constructor(repo: IUserRepository, jwt: IJWTService) {
        this.repo = repo
        this.jwt = jwt
    }
    async login(email: string, password: string): Promise<{ existing: User, Accesstoken: string } | null> {
        if (!email || !password) {
            throw new Error("credential details is missing")
        }
        try {
            const existing = await this.repo.findUserByEmail(email)
            if (!existing) {
                throw new Error("Admin not found at this email")
            }
            const comparePassword = await bcrypt.compare(password, existing?.password)
            if (!comparePassword) {
                throw new Error("Admin password not Mat")
            }
            const accessToken = process.env.ACCESS_SECRECT_KEY as string
            const refreshToken = process.env.REFRESH_SECRECT_KEY as string

            const Accesstoken = this.jwt.createAccessToken(accessToken, String(existing?.id), existing.role)
            const RefreshToken = this.jwt.createRefreshTokem(refreshToken, existing.role)

            return { existing, Accesstoken }

        } catch (error) {
            console.log("error in LoginUsecase", error);
            return null;
        }
    }

}