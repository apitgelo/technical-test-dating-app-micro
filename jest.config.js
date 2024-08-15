process.env.APP_DEBUG=true;

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      importHelpers: true,
    }],
  },
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '^root(.*)$': '<rootDir>/src$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/utils/mongodb-setup.ts'],
  coverageDirectory: 'coverage',
};


