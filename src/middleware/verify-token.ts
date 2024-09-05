import { NextFunction, Request, Response } from "express";
import { validateToken, checkHeader } from "../util";
import { config } from "../config";

/**
 * Middleware that verifies a token and stores the token data in res.locals['token_data']
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = checkHeader(req);
        res.locals['token_data']  = validateToken({ token, secret: config.secret });
        next();
    } catch (error: unknown) {
        if (error instanceof Error)
            res.status(401).json({ auth: false, message: error.message });
        else
            res.status(401).json({ auth: false, message: 'Token invalid' });
    }
};