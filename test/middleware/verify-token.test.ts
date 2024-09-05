import { sign } from 'jsonwebtoken';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { config, verifyToken } from '../../src';

describe('verifyToken tests', () => {
    const token: string = sign({ data: 'value' }, config.secret, { expiresIn: '1h' });

    test('verifyToken should return the token data in res', () => {
        const req = mockRequest({ headers: { authorization: `Bearer ${token}` } });
        const res = mockResponse();
        const next = jest.fn();
        verifyToken(req, res, next);
        expect(res.locals).toHaveProperty('token_data');
        expect(res.locals['token_data']).toHaveProperty('data');
        expect(res.locals['token_data']['data']).toBe('value');
    });

    test('verifyToken should throw an error if no token is provided', () => {
        const req = mockRequest({ headers: { authorization: 'Bearer' } });
        const res = mockResponse();
        const next = jest.fn();
        verifyToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ auth: false, message: 'No token provided' });
    });

    test('verifyToken should throw an error if something goes wrong', () => {
        const req = mockRequest({ headers: { authorization: `Bearer ${token}` } });
        const res = mockResponse();
        const next = jest.fn().mockImplementation(() => { throw 'Error' });
        verifyToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ auth: false, message: 'Token invalid' });
    });
});