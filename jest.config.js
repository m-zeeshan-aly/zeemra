import nextJest from 'next/jest.js';

/**
 * Task 13: Jest configuration for ZEEMRA unit tests.
 * Uses next/jest to inherit Next.js babel transforms and environment setup.
 */
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};

export default createJestConfig(customJestConfig);
