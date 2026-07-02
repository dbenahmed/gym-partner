import { JwtPayload, SignOptions } from 'jsonwebtoken';
import { Request } from 'express';

export interface UserDataPayload {
    id: number;
    username: string;
    avatar: string | null;
    email: string | null;
    firstname: string;
    lastname: string;
}

export interface JwtCustomPayloadInterface extends JwtPayload {
    id: number;
}

export interface AuthenticatedRequest extends Request {
    user: number;
    userData: UserDataPayload;
    token: string;
}

export interface UnauthenticatedRequest extends Request {
    user?: number;
    userData?: UserDataPayload;
    token?: string;
}