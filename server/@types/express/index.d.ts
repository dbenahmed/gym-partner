export { };

export type UserType = {
    id: number;
    username: string;
    avatar: string | null;
    email: string | null;
    firstname: string;
    lastname: string;
};

declare global {
    namespace Express {
        export interface Request {
            user?: number; // contains the User Id
            userData?: UserType; // Container the User Database Data
            token?: string; // Contains the Auth Token
        }
    }
}