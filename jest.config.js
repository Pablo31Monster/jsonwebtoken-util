/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest",{}],
    },
    collectCoverage: true,
    cache: false,
    detectOpenHandles: true,
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "/test/index.ts",
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
    ],
};