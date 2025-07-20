import { LoginController } from "../../../adapters/controllers/UserController/loginController";
import { RegisterController } from "../../../adapters/controllers/UserController/registerController";
import { UserUpdateController } from "../../../adapters/controllers/UserController/userUpdateController";
import { UserRepository } from "../../../adapters/repository/user/UserRepository";
import { LoginUseCase } from "../../../useCase/user/loginUseCase";
import { UpdateUserUsecas } from "../../../useCase/user/updateUserUsecase";
import { UseCaseRegister } from "../../../useCase/user/userRegister";
import { JwtService } from "../../services/JWTService";

//Register user
const UserRepo= new UserRepository()
const useCaseRegister=new UseCaseRegister(UserRepo)
export const registerController=new RegisterController(useCaseRegister)

//Login User
const jwtSevice=new JwtService()
const loginUseCase=new LoginUseCase(UserRepo,jwtSevice)
export const loginController= new LoginController(loginUseCase)

//UpdateUser

const updateUserUsecase=new UpdateUserUsecas(UserRepo)
export const updateUserController=new UserUpdateController(updateUserUsecase)


