import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/env.js";
import * as authRepo from "../repositories/authRepositories.js";
import { BadRequestError, ConflictError, UnauthorizedError } from "../errors/errors";
import { userData } from "../repositories/authRepositories.js";
import { JwtCustomPayloadInterface } from "../types/auth.types";


interface RegisterUserRequestInterface {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
}

export const registerUserService = async ({ username, password, firstname, lastname }: RegisterUserRequestInterface) => {
    const existUser = await authRepo.getUserByUsername(username);
    if (existUser.length > 0) {
        throw new BadRequestError("the username already exists");
    }

    const saltRounds = config.saltRounds || 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await authRepo.createUser({
        username: username,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        salt: "no salt currently"
    });
};


interface LoginUserServiceRequestInterface {
    username: string,
    password: string
}


export const loginUserService = async ({ username, password }: LoginUserServiceRequestInterface) => {
    const existUser = await authRepo.getUserByUsername(username);
    if (existUser.length === 0) {
        throw new UnauthorizedError("the username is not valid");
    }

    const user = existUser[0];
    const passwdCorrect = await bcrypt.compare(password, user.password);

    if (!passwdCorrect) {
        throw new UnauthorizedError("the username or password is not correct !")
    }

    const jwtPayload: JwtCustomPayloadInterface = {
        id: user.id
    }
    const jwtOptions: SignOptions = {
        expiresIn: config.jwtExpiresIn || "1d"
    }

    const token = jwt.sign(
        jwtPayload,
        config.jwtSecret,
        jwtOptions
    );

    return { user, token };
};

export const getUserProfileService = async (userId: number) => {
    const foundUsers = await authRepo.getUserById(userId);
    if (foundUsers.length === 0) {
        throw new ConflictError("The access token has invalid userId!");
    }
    return foundUsers[0];
};


export const updateUserProfileService = async (userId: number, body: Partial<userData>) => {
    const newData: Partial<userData> = Object.fromEntries(Object.entries(body).filter((v) => v[1] !== null));
    await authRepo.updateUser(userId, newData);
};
