import { generateTokens } from '../../src';

describe('generateTokens tests', () => {
    test('generateTokens should return the tokens created', () => {
        const data = { data: 'data' };
        const secret = 'secret';
        const refreshSecret = 'refreshSecret';
        const tokens = generateTokens({ data, secret, refreshSecret });
        expect(tokens).toHaveProperty('token');
        expect(tokens).toHaveProperty('refreshToken');
        expect(tokens.token).not.toBe('');
        expect(tokens.refreshToken).not.toBe('');
    });

    test('generateTokens should throw an error if no data is provided', () => {
        const secret = 'secret';
        const refreshSecret = 'refreshSecret';
        expect(() => generateTokens({ data: '', secret, refreshSecret })).toThrow('Data is required');
    });

    test('generateTokens should throw an error if no secret is provided', () => {
        const data = { data: 'data' };
        const refreshSecret = 'refreshSecret';
        expect(() => generateTokens({ data, secret: '', refreshSecret })).toThrow('Secret is required');
    });

    test('generateTokens should throw an error if no refresh secret is provided', () => {
        const data = { data: 'data' };
        const secret = 'secret';
        expect(() => generateTokens({ data, secret, refreshSecret: '' })).toThrow('Refresh secret is required');
    });
});
