import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export class Database {
    private mongoUri: string;

    constructor() {
        this.mongoUri = process.env.MONGO_URI as string;
    }

    public async connect(): Promise<void> {
        try {
            if (!this.mongoUri) throw new Error("MongoDB URI not found in environment");

            await mongoose.connect(this.mongoUri);
            console.log(" MongoDB connected successfully");
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            process.exit(1); 
        }
    }
}
