import { sign } from 'jsonwebtoken';
import { validateToken } from '../../src';

describe('validateToken tests', () => {
    const secret = 'secret';
    const token: string = sign({ data: 'value' }, secret, { expiresIn: '1h' });

    test('validateToken should return the tokens created', () => {
        const decoded = validateToken({ token, secret });
        expect(decoded).toHaveProperty('data');
        if (typeof decoded === 'string') {
            throw new Error('decoded is a string');
        }
        expect(decoded['data']).toBe('value');
    });

    test('validateToken should throw an error if no token is provided', () => {
        expect(() => validateToken({ token: '', secret })).toThrow('Invalid token or secret');
    });
});
