import dotenv from 'dotenv'
import cors from 'cors'
import express, { Application, NextFunction, urlencoded,Request,Response } from 'express'
import { UserRoutes } from './src/framework/routes/user/UserRoutes';
import { Database } from './src/framework/database/Database';
import { AdminRoute } from './src/framework/routes/admin/AdminRoutes';
dotenv.config()



export class Server {
    private app: Application;
    private port: string | number;
    private database: Database

    constructor() {
        this.app = express()
        this.database = new Database()
        this.port = process.env.PORT || 3000
        this.middleware()
        this.Routes()
        this.AdminRoute()
        this.connectDB()
    }

    private async connectDB(){
        await this.database.connect()
    }


    private middleware() {
        this.app.use(cors({ origin: "http://localhost:5173" }))
        this.app.use(urlencoded())
        this.app.use(express.json())
       
    }

    private Routes() {
        this.app.use('/', new UserRoutes().userRoutes)
    }

    private AdminRoute(){
        this.app.use('/admin/', new AdminRoute().adminRoutes)
    }

    
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server runned this ${this.port} port`)
        })
    }
}

new Server().listen()