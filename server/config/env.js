import dotenv from "dotenv";


export const loadEnvironment = () => {
  dotenv.config({
    path: `.env.development`,
  });

  return {
    port: parseInt(process.env.PORT || "3000"),
    databaseUrl: process.env.DATABASE_URL || "",
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
    jwtSecret: process.env.JWT_SECRET || "",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    allowedOrigins: process.env.ALLOWED_ORIGINS || "*",
    secure: process.env.SECURE === "true",
    isDevelopment: true,
  };
};

export const config = loadEnvironment();

export default config;