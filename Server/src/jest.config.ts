import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/utils/setTestEnvVars.ts'],
  coverageDirectory: "../coverage"
};

export default config;