import { Request, Response } from 'express'
import { IRegesterInterface, } from '../../../domain/interface/IUsecaseInterface/user/IUseCaseRegisterInterface'

export class RegisterController {

    private useRegister
    constructor(useRegister: IRegesterInterface) {
        this.useRegister = useRegister

    }
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body
            const exist = await this.useRegister.createUser({
                name, email, password,
                role: 'user'
            })
            if (!exist) {
                res.status(400).json({ message: "Failed to Register" })
                return
            }
            res.status(200).json({ message: "User Created Successfully" })
        } catch (error:any) {
            console.log("Error in Register Controller",error);
            res.status(400).json({ error:error.message })
        }
    }
}