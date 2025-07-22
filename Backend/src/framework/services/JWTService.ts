import { IJWTService } from "../../domain/interface/IServiceInterface/IJwtServise";
import jwt from 'jsonwebtoken'


export class JwtService implements IJWTService{
    
    createAccessToken(accessSecretKey: string, userId: string, role: string): string {
        return jwt.sign({userId,role},accessSecretKey,{expiresIn:"15m"})
    }

    createRefreshTokem(refreshSecretKey: string, userId: string): string {
        return jwt.sign({userId},refreshSecretKey,{expiresIn:"7d"})
    }

    verifyAccessToken(token: string, secretKey: string): any {
        return jwt.verify(token, secretKey);
    }

}