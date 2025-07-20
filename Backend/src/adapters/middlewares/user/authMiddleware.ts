import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../../framework/services/JWTService";
import dotenv from 'dotenv';
import { JwtPayload } from "jsonwebtoken";



dotenv.config();

const jwtService = new JwtService();

export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization
    console.log(authHeader)
    if(!authHeader||!authHeader?.startsWith('Bearer')){
        res.status(401).json({ error:'Missing or Invalid Token' });
            return
    }
    try {
        const token=authHeader?.split(" ")[1]
        const decode=jwtService.verifyAccessToken(token,process.env.ACCESS_SECRECT_KEY as string)as JwtPayload;
        
        (req as any).user = decode
                next()
        
    } catch (err:any) {
        console.log("Error in Auth MiddleWare",err);
        res.status(401).json({ error:err.message });
    }

}