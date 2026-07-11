import jwt from 'jsonwebtoken'

import { config } from "@/config/env.js"
import { NextFunction, Request, Response } from 'express';
import { JwtCustomPayloadInterface } from "@/core/types/auth.types.js";


export const getAccessToken = async (req: Request, res: Response) => {
    // Try cookie (web)
    const cookieToken = req.cookies?.access_token;

    // Try Authorization header (mobile)
    const authHeader = req.headers?.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    return cookieToken || bearerToken || null;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get the token from the request
        const token = await getAccessToken(req, res);
        if (!token) {
            console.log("No token provided or invalid format")
            return res.status(401).json({ message: 'No token provided or invalid format' });
        }
        // Verify the token using your secret key
        const decoded = jwt.verify(token, config.jwtSecret || 'your-secret-key') as JwtCustomPayloadInterface;
        console.log(decoded)
        // verify userId is inside the decoded access token, and backward compatibility for old tokens
        if (!decoded.id) {
            console.log("Access token outdated or invalid. Please log in again.")
            res.status(401).json({ success: false, message: "Access token outdated or invalid. Please log in again." })
            return;
        }
        req.user = Number(decoded.id);
        req.userData = {
            id: Number(decoded.id),
            username: decoded.username,
            avatar: decoded.avatar,
            email: decoded.email,
            firstname: decoded.firstname,
            lastname: decoded.lastname
        };
        req.token = token;
        next();
    } catch (error: any) {
        if (error instanceof jwt.JsonWebTokenError) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            }
        } else {
            return res.status(500).json({ message: 'Authentication failed', error: error.message });
        }
    }
}

export default authMiddleware;
