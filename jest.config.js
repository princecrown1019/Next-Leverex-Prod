const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['<rootDir>/mocks/localStorage.ts'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  moduleNameMapper: {
    '~/constants(.*)': '<rootDir>/src/constants/$1',
    '~/types/(.*)': '<rootDir>/src/types/$1',
    '~/containers/(.*)': '<rootDir>/src/containers/$1',
    '~/components/(.*)': '<rootDir>/src/components/$1',
    '~/hooks/(.*)': '<rootDir>/src/hooks/$1',
    '~/hoks/(.*)': '<rootDir>/src/hoks/$1',
    '~/services/(.*)': '<rootDir>/src/services/$1',
    '~/assets/(.*)': '<rootDir>/src/assets/$1',
    '~/store(.*)': '<rootDir>/src/store/$1'
  },

  testEnvironment: 'jest-environment-jsdom'
};

module.exports = createJestConfig(customJestConfig);
