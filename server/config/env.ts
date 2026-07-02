import dotenv from "dotenv";
import type { StringValue } from "ms";


interface EnvConfig {
    port: number;
    databaseUrl: string;
    bcryptSaltRounds: number;
    jwtSecret: string;
    jwtExpiresIn: StringValue;
    allowedOrigins: string;
    secure: boolean;
    isDevelopment: boolean;
    saltRounds: number;
    nodeEnv: "development" | "production" | "test" | "staging" | "local";
}


export const loadEnvironment = (): EnvConfig => {
    dotenv.config({
        path: `.env.development`,
    });

    return {
        port: parseInt(process.env.PORT || "3000"),
        databaseUrl: process.env.DATABASE_URL || "",
        bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
        jwtSecret: process.env.JWT_SECRET || "",
        jwtExpiresIn: process.env.JWT_EXPIRES_IN as StringValue || "7d",
        allowedOrigins: process.env.ALLOWED_ORIGINS || "*",
        secure: process.env.SECURE === "true",
        isDevelopment: true,
        saltRounds: 10,
        nodeEnv: (process.env.NODE_ENV || "development") as EnvConfig["nodeEnv"],
    };
};

export const config = loadEnvironment();

export default config;