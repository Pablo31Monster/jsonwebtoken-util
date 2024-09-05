import { JwtPayload, verify } from 'jsonwebtoken';
import { config } from '../config';

/**
 * Validate a token
 * @param token - The token to validate
 * @param secret - The secret to use
 * @returns The decoded token
 */
export function validateToken({ token, secret }: { token: string; secret: string }): JwtPayload | string {
    try {
        const decoded = verify(token, secret, {
            ...config.verifyOptions,
            complete: false
        });
        return decoded;
    } catch {
        throw new Error('Invalid token or secret');
    }
}
