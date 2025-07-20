import { ObjectId } from 'mongoose'

export interface User {
    id?: ObjectId | string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    profile?: string;
    phone?:string|null
}