import { JwtPayload, sign } from 'jsonwebtoken';
import { config } from '../config';

/**
 * Generate a token
 * @param data - The data to encode
 * @param secret - The secret to use
 * @param refreshSecret - The refresh secret to use
 * @returns The token and refresh token
 */
export function generateTokens
(
    { data, secret, refreshSecret }: 
    { data: JwtPayload | string, secret: string, refreshSecret: string }
):
    { token: string, refreshToken: string } 
{
    if (!data) throw new Error('Data is required');
    if (!secret) throw new Error('Secret is required');
    if (!refreshSecret) throw new Error('Refresh secret is required');
    if (typeof data !== 'string') {
        delete data['iss'];
        delete data['sub'];
        delete data['aud'];
        delete data['exp'];
        delete data['nbf'];
        delete data['iat'];
        delete data['jti'];
    }
    const token = sign(data, secret, { ...config.signOptions, expiresIn: config.expiresIn });
    const refreshToken = sign(data, refreshSecret, { ...config.signOptions, expiresIn: config.refreshExpiresIn });
    return { token, refreshToken }
};