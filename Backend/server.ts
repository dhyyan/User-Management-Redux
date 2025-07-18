import dotenv from 'dotenv'
import cors from 'cors'
import express,  { Application, urlencoded } from 'express'
import { UserRoutes } from './src/framework/routes/user/UserRoutes';
dotenv.config()



export class Server {
    private app:Application;
    private port:string|number;

    constructor(){
        this.app=express()
        this.port = process.env.PORT||3000 
        
        this.middleware()
        this.Routes()
    }
    private middleware(){
        this.app.use(cors({origin:"http://localhost:5173/"}))
        this.app.use(urlencoded())
        this.app.use(express.json())
    }

    private Routes(){
        this.app.use('/',new UserRoutes().userRoutes)
    }

    
    public listen(){
        this.app.listen(this.port,()=>{
            console.log(`server runned this ${this.port} port`)
        })
    }
}

new Server().listen()