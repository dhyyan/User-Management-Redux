

export interface IJWTService{
    createAccessToken(accessSecretKey:string,userId:string,role:string):string
    createRefreshTokem(refreshSecretKey:string,userId:string):string
    verifyAccessToken(accessSecretKey:string,token:string):string
}