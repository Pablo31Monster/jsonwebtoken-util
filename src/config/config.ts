import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Configuration for the jsonwebtoken-utils package
 */
export let config = {
    /** default using env JWT_SECRET */
    secret: process.env['JWT_SECRET'] || 'secret',
    /** default using env JWT_REFRESH_SECRET */
    refreshSecret: process.env['JWT_REFRESH_SECRET'] || 'refresh-secret',
    /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
    expiresIn: process.env['JWT_EXPIRES_IN'] || '1h',
    /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] || '6h',
    signOptions: {} as Omit<SignOptions, 'expiresIn'>,
    verifyOptions: {} as Omit<VerifyOptions, 'complete'>
};

/**
 * Set the configuration for the jsonwebtoken-utils package
 * @param secret - The secret to use
 * @param refreshSecret - The refresh secret to use
 * @param expiresIn - The expiration time for the token
 * @param refreshExpiresIn - The expiration time for the refresh token
 * @param signOptions - The sign options
 * @param verifyOptions - The verify options
 * @returns The configuration
 */
export function setConfig({ secret, refreshSecret, expiresIn, refreshExpiresIn, signOptions, verifyOptions }: Partial<typeof config>): typeof config {
    config = {
        secret: secret || config.secret,
        refreshSecret: refreshSecret || config.refreshSecret,
        expiresIn: expiresIn || config.expiresIn,
        refreshExpiresIn: refreshExpiresIn || config.refreshExpiresIn,
        signOptions: signOptions || config.signOptions,
        verifyOptions: verifyOptions || config.verifyOptions
    };
    return config;
}
