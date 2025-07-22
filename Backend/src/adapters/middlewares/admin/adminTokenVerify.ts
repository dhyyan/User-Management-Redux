import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../../framework/services/JWTService";
import dotenv from 'dotenv';
import { JwtPayload } from "jsonwebtoken";


const jwtService = new JwtService();
export const  adminTokenVerify=async(req:Request,res:Response,next:NextFunction)=>{
const verifyHeader=req.headers.authorization
if(!verifyHeader||!verifyHeader?.startsWith('Bearer')){
            res.status(401).json({ error:'Missing or Invalid Token' });
            return
}
const token =verifyHeader?.split(' ')[1]
const decode=await jwtService.verifyAccessToken(token,process.env.ACCESS_SECRECT_KEY as string)as JwtPayload;
  (req as any).user = decode

console.log("verifyHeader",verifyHeader)
next()
}