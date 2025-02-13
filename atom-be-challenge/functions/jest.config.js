module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
    },
    testMatch: ['**/test/**/*.test.ts'],
    transformIgnorePatterns: ['/node_modules/(?!chai)'],
    setupFiles: ['<rootDir>/test/setup.ts'],
};