import { generateVerify } from './generate-verify';
import { config } from '../config';

/**
 * Middleware that verifies a refresh token and stores the token data in res.locals['token_data']
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const verifyRefreshToken = generateVerify({ secret: config.refreshSecret });

