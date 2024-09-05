import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {}]
    },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    cache: false,
    detectOpenHandles: true,
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/index.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/']
};

export default config;
