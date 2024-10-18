module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm', // Ensure it supports both TS and JS in ESM
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig.json', // Make sure it's pointing to the right tsconfig
    },
  },
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Handle ESM imports of TypeScript files
  },
};
