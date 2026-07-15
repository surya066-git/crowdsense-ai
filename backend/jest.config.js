export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  setupFiles: ['<rootDir>/src/tests/setupEnv.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/server.js', '!src/tests/**'],
};
