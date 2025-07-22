import { Router } from "express"
import { Request, Response } from "express";
import { admindeleteUserController, adminLoginController } from "../../DI/admin/adminInject";
import { listUser } from "../../DI/admin/adminInject"
import { adminUpdateController } from "../../DI/admin/adminInject"
import { adminTokenVerify } from "../../../adapters/middlewares/admin/adminTokenVerify";
import { checkRoleBasedToken } from "../../../adapters/middlewares/user/RoleBasedCheck";

export class AdminRoute {

    public adminRoutes: Router

    constructor() {
        this.adminRoutes = Router()
        this.setRoutes()
    }
    private setRoutes() {
        this.adminRoutes.post('/login', (req: Request, res: Response) => {
            adminLoginController.login(req, res)
        })

        this.adminRoutes.get('/users', (req: Request, res: Response) => {
            console.log("worjhuuhskjdfs")
            listUser.listuserdata(req, res)
        })

        this.adminRoutes.get('/updateUser/:id',adminTokenVerify,checkRoleBasedToken('admin'),(req: Request, res: Response) => {
            adminUpdateController.update(req, res)
        })

        this.adminRoutes.post('/deleteUser/:id',adminTokenVerify,checkRoleBasedToken('admin'),(req:Request,res:Response)=>{
            admindeleteUserController.deleteUser(req,res)
        })


    }
}