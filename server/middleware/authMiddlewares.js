import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
<<<<<<< HEAD
 
dotenv.config();
expot
=======
import db from '../db/index.js';
import { users } from '../db/schemas/dev/schema.js';
import { eq } from 'drizzle-orm';
dotenv.config();



const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or invalid format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // verify userId is inside the decoded access token
        if (!decoded.id) {
            res.status(400).json({ success: false, message: "Access token invalid no user id included" })
        }
        // verify user exists
        const foundUser = await db.select({ id: users.id, username: users.username, avatar: users.avatar, email: users.email, firstname: users.firstname, lastname: users.lastname }).from(users).where(eq(users.id, decoded.id)).limit(1)
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
>>>>>>> 4387c64987cf4b92dc58458823fa2e0329ece5b8
