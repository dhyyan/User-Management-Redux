import { NextFunction, Request, Response } from "express";

export const checkRoleBasedToken=(...role:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        const user = (req as any).user
        console.log("Rolese based",user)
        console.log(user)
        if (!user || !role.includes(user.role)) {
            res.status(400).json({ error: "Access Denied:UnAuthorized role" })
            return
        }
        next()
    }
}