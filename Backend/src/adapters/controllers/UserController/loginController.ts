import { Request, Response } from "express";
import { ILoginUseCase } from "../../../domain/interface/IUsecaseInterface/user/IUseCaseLogin";

export class LoginController {
    private loginUseCase: ILoginUseCase;

    constructor(loginUseCase: ILoginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
                return;
            }
            const result = await this.loginUseCase.loginUser(email, password);

            res.status(200).json({ message: "Login successful", user: result?.data, token: result?.Accesstoken });
        } catch (error) {
            console.log('error while login', error)
            res.status(400).json({
                message: "error while login client",
                error: error instanceof Error ? error.message : 'unknown error from login  controller',
            })
        }
    }
}
