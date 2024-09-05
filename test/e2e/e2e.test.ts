import { sign } from 'jsonwebtoken';
import { config } from '../../src';
import { app, server } from '..';
import supertest from 'supertest';

describe('e2e tests', () => {
    const token: string = sign({ data: 'value' }, config.secret, { expiresIn: '1h' });
    const refreshToken: string = sign({ data: 'value' }, config.refreshSecret, { expiresIn: '1h' });

    test('e2e GET /protected test', () => {
        supertest(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function (err) {
                if (err) throw err;
            });
    });

    test('e2e GET /refresh test', () => {
        supertest(app)
            .get('/refresh')
            .set('Authorization', `Bearer ${refreshToken}`)
            .expect(200)
            .end(function (err) {
                if (err) throw err;
            });
    });

    afterAll(() => {
        server.close();
    });
});
