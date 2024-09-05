import { sign } from 'jsonwebtoken';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { config, verifyRefreshToken } from '../../src';

describe('verifyRefreshToken tests', () => {
    const token: string = sign({ data: 'value' }, config.refreshSecret, { expiresIn: '1h' });

    test('verifyRefreshToken should return the token data in res', () => {
        const req = mockRequest({ headers: { authorization: `Bearer ${token}` } });
        const res = mockResponse();
        const next = jest.fn();
        verifyRefreshToken(req, res, next);
        expect(res.locals).toHaveProperty('token_data');
        expect(res.locals['token_data']).toHaveProperty('data');
        expect(res.locals['token_data']['data']).toBe('value');
    });

    test('verifyRefreshToken should throw an error if no token is provided', () => {
        const req = mockRequest({ headers: { authorization: 'Bearer' } });
        const res = mockResponse();
        const next = jest.fn();
        verifyRefreshToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ auth: false, message: 'No token provided' });
    });

    test('verifyRefreshToken should throw an error if something goes wrong', () => {
        const req = mockRequest({ headers: { authorization: `Bearer ${token}` } });
        const res = mockResponse();
        const next = jest.fn().mockImplementation(() => {
            throw 'Error';
        });
        verifyRefreshToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ auth: false, message: 'Token invalid' });
    });
});
