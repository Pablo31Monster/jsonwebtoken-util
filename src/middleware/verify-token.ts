import { generateVerify } from './generate-verify';
import { config } from '../config';

/**
 * Middleware that verifies a token and stores the token data in res.locals['token_data']
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const verifyToken = generateVerify({ secret: config.secret });