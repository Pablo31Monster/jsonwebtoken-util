import { config, setConfig } from '../../src';

describe('config tests', () => {
    test('config should return the default values', () => {
        const configuration = config;
        expect(configuration).toHaveProperty('secret');
        expect(configuration).toHaveProperty('refreshSecret');
        expect(configuration).toHaveProperty('expiresIn');
        expect(configuration).toHaveProperty('refreshExpiresIn');
        expect(configuration).toHaveProperty('signOptions');
        expect(configuration).toHaveProperty('verifyOptions');
        expect(configuration.secret).toBe('secret');
        expect(configuration.refreshSecret).toBe('refresh-secret');
        expect(configuration.expiresIn).toBe('1h');
        expect(configuration.refreshExpiresIn).toBe('6h');
        expect(configuration.signOptions).toStrictEqual({});
        expect(configuration.verifyOptions).toStrictEqual({});
    });

    test('setConfig should set the configuration', () => {
        const configuration = setConfig({});
        expect(configuration.secret).toBe('secret');
        expect(configuration.refreshSecret).toBe('refresh-secret');
        expect(configuration.expiresIn).toBe('1h');
        expect(configuration.refreshExpiresIn).toBe('6h');
        expect(configuration.signOptions).toStrictEqual({});
        expect(configuration.verifyOptions).toStrictEqual({});
        const newConfig = setConfig({
            secret: 'new',
            refreshSecret: 'new-refresh',
            expiresIn: '2h',
            refreshExpiresIn: '7h',
            signOptions: { algorithm: 'HS256' },
            verifyOptions: { algorithms: ['HS256'] }
        });
        expect(newConfig.secret).toBe('new');
        expect(newConfig.refreshSecret).toBe('new-refresh');
        expect(newConfig.expiresIn).toBe('2h');
        expect(newConfig.refreshExpiresIn).toBe('7h');
        expect(newConfig.signOptions).toStrictEqual({ algorithm: 'HS256' });
        expect(newConfig.verifyOptions).toStrictEqual({ algorithms: ['HS256'] });
    });
});
