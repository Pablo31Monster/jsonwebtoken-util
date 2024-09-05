import { NextFunction, Request, Response } from "express";
import { checkHeader, validateToken } from "../util";

export function generateVerify ({ secret }: { secret: string }) {
    const verify = (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = checkHeader(req);
            res.locals['token_data'] = validateToken({
                token,
                secret: secret
            });
            next();
        } catch (error: unknown) {
            if (error instanceof Error) res.status(401).json({ auth: false, message: error.message });
            else res.status(401).json({ auth: false, message: 'Token invalid' });
        }
    };
    return verify;
};