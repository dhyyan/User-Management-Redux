import { AdminDeleteController } from "../../../adapters/controllers/AdminController/adminDeleteController";
import { AdminLogin } from "../../../adapters/controllers/AdminController/adminLoginController";
import { AdminUpdateUser } from "../../../adapters/controllers/AdminController/adminUpdateController";
import { DashboardControler } from "../../../adapters/controllers/AdminController/dasboardControler";
import { UserRepository } from "../../../adapters/repository/user/UserRepository";
import { AdminDeleteUsecase } from "../../../useCase/admin/AdminDeleUseCase";
import { AdminLoginUsecase } from "../../../useCase/admin/AdminLoginUseCase";
import ListUsecase from "../../../useCase/admin/ListUserUsecase";
import { UpdateUserUseCase } from "../../../useCase/admin/UpdateUserUseCase";
import { JwtService } from "../../services/JWTService";


//Admin Login
const adminReppsitory=new UserRepository()
const jwt =new JwtService()
const loginUsecase= new AdminLoginUsecase(adminReppsitory,jwt)
export const adminLoginController=new AdminLogin(loginUsecase)

//admin fetch user
const listUserUseCase=new ListUsecase(adminReppsitory)
export const listUser=new DashboardControler(listUserUseCase)

//updateUserProfile

const updateUserUsecase=new UpdateUserUseCase(adminReppsitory)
export const adminUpdateController= new AdminUpdateUser(updateUserUsecase)

//Delete User
const adminDeleteUsecase= new AdminDeleteUsecase(adminReppsitory)
export const  admindeleteUserController=new AdminDeleteController(adminDeleteUsecase)

