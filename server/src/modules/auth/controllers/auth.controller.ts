import { config } from "@/config/env.js";
import * as authService from "../services/auth.service";
import { Request, Response } from 'express';
import { HttpError } from "@/core/errors/errors.js";
import asyncHandler from "express-async-handler";

//the registration controller 
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    await authService.registerUserService(req.body);
    res.status(201).send({
        success: true,
        message: "the registration is complete successfully"
    });
});

//THE LOGIN CONTROLLER 
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
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
});

// Get the authenticated user's profile data
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
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
});

// Update the authenticated user's profile
export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
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
});

// Log out the user for the web version which does not exist so..
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
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
});

export const checkAuth = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'The user is authenticated',
        accessToken: req.token
    });
});
