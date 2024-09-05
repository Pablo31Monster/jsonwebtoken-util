import { Request } from 'express';

/**
 * Check if the header is valid ( 'Authorization: Bearer token' )
 * @param req - The request object
 * @returns The token from the header
 */
export function checkHeader(req: Request): string {
    if (!req.headers) throw new Error('No header provided');
    const header = req.headers['authorization'];
    if (!header) throw new Error('No header provided');
    const [bearer, token] = header.split(' ');
    if (bearer !== 'Bearer') throw new Error('Invalid header');
    if (!token) throw new Error('No token provided');
    return token;
}
