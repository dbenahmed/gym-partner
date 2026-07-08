import { config } from "../config/env";
import * as authService from "../services/authServices";
import { Request, Response } from 'express';
import { HttpError } from "../errors/errors";

//the registration controller 
export const registerUser = async (req: Request, res: Response) => {
    try {
        await authService.registerUserService(req.body);
        res.status(201).send({
            success: true,
            message: "the registration is complete successfully"
        });
    } catch (err) {
        const status = err instanceof HttpError ? err.status : 500;
        const message = err instanceof HttpError ? err.message : "Internal Server Error";
        res.status(status).json({
            success: false,
            message: message,
        });
    }
};

//THE LOGIN CONTROLLER 
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { user, token } = await authService.loginUserService(req.body);

        res.cookie("access_token", token, {
            httpOnly: true,                // Prevents XSS attacks
            secure: config.nodeEnv === "production", // true in production, false in development (for HTTP)
            maxAge: 24 * 60 * 60 * 1000,   // Cookie expires in 1 day (same as token expiration)
            path: "/",                     // Ensure the cookie is available across all paths
        });

        res.status(200).json({
            success: true,
            message: "the login is complete successfuly",
            data: {
                id: user.id,
                accessToken: token
            }
        });
    } catch (err) {
        const status: number = err instanceof HttpError ? err.status : 500;
        const message: string = err instanceof HttpError ? err.message : "Internal Server Error";
        res.status(status || 500).json({
            success: false,
            message: message
        });
    }
};

// Get the authenticated user's profile data
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user as number;


        const user = await authService.getUserProfileService(userId);

        console.log(user);
        res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data: {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            }
        });
    } catch (err) {
        console.log(err);
        const status: number = err instanceof HttpError ? err.status : 500;
        const message: string = err instanceof HttpError ? err.message : "Error";
        res.status(status || 500).json({
            success: false,
            message: message
        });
    }
};

// Update the authenticated user's profile
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user as number;
        const { username, avatar, email, firstname, lastname } = req.body;

        await authService.updateUserProfileService(userId, {
            username,
            avatar,
            email,
            firstname,
            lastname
        });

        res.json({
            success: true,
            message: 'User`s data updated successfully'
        });
    } catch (err) {
        console.log(err);
        const status: number = err instanceof HttpError ? err.status : 500;
        const message: string = err instanceof HttpError ? err.message : "Error updating user profile";
        res.status(status || 500).json({
            success: false,
            message: message
        });
    }
};

// Log out the user for the web version which does not exist so..
export const logoutUser = (req: Request, res: Response) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: (config.secure),
            sameSite: config.nodeEnv === "production" ? "none" : "lax",
            maxAge: 0,
            path: "/"
        });
        res.status(200).json({
            success: true,
            message: 'The user is logged out successfully'
        });
    } catch (err) {
        const status: number = err instanceof HttpError ? err.status : 500;
        const message: string = err instanceof HttpError ? err.message : "Error updating user profile";
        res.status(status || 500).json({
            success: false,
            message: message
        });
    }
};

export const checkAuth = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'The user is authenticated',
            accessToken: req.token
        });
    } catch (err) {
        const status: number = err instanceof HttpError ? err.status : 500;
        const message: string = err instanceof HttpError ? err.message : "Error checking authentication";
        res.status(status || 500).json({
            success: false,
            message: message
        });
    }
};
