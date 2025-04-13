import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from '../db/index.js';
import { users } from '../db/schemas/dev/schema.js';
import { eq } from 'drizzle-orm';
dotenv.config();


const getAccessToken = async (req, res, next) => {
    // Try cookie (web)
    const cookieToken = req.cookies?.access_token;

    // Try Authorization header (mobile)
    const authHeader = req.headers?.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    return cookieToken || bearerToken || null;
}


const authMiddleware = async (req, res, next) => {
    try {
        // get the token from the request
        const token = await getAccessToken(req, res, next);
        if (!token) {
            return res.status(401).json({ message: 'No token provided or invalid format' });
        }
        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // verify userId is inside the decoded access token
        if (!decoded.id) {
            res.status(400).json({ success: false, message: "Access token invalid no user id included" })
            return;
        }
        // verify user exists
        const foundUser = await db.select({ id: users.id, username: users.username, avatar: users.avatar, email: users.email, firstname: users.firstname, lastname: users.lastname }).from(users).where(eq(users.id, decoded.id)).limit(1)

        if (foundUser.length === 0) {
            res.status(400).json({ success: false, message: "Access token invalid no user id included" })
            return;
        }

        req.user = foundUser[0].id;
        req.userData = foundUser[0]
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Authentication failed', error: error.message });
    }
}

export default authMiddleware;