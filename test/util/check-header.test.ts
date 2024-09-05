import { mockRequest } from 'jest-mock-req-res';
import { checkHeader } from '../../src';

describe('checkHeader tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('checkHeader should return the token in the header', () => {
        const req = mockRequest({ headers: { authorization: 'Bearer token' } });
        const token = checkHeader(req);
        expect(token).toBe('token');
    });

    test('checkHeader shoud throw an error if no headers are provided', () => {
        const req = mockRequest();
        expect(() => checkHeader(req)).toThrow('No header provided');
    });

    test('checkHeader shoud throw an error if no header is provided', () => {
        const req = mockRequest({ headers: {} });
        expect(() => checkHeader(req)).toThrow('No header provided');
    });

    test('checkHeader shoud throw an error if the header is invalid', () => {
        const req = mockRequest({ headers: { authorization: 'token' } });
        expect(() => checkHeader(req)).toThrow('Invalid header');
    });

    test('checkHeader shoud throw an error if no token is provided', () => {
        const req = mockRequest({ headers: { authorization: 'Bearer' } });
        expect(() => checkHeader(req)).toThrow('No token provided');
    });
});