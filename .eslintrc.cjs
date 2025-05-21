module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Added node for common build scripts/configs
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended', // Common for React projects
    // 'standard-with-typescript', // This pulls in a lot of specific rules. Starting more general.
    // Consider adding 'eslint-config-prettier' to turn off conflicting style rules if Prettier is used.
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // Important for type-aware linting
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import', // For import sorting/rules
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
    'import/resolver': {
      typescript: {}, // This helps eslint-plugin-import understand TS paths
    },
  },
  rules: {
    // Common rules:
    'react/prop-types': 'off', // Not needed with TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+ new JSX transform
    '@typescript-eslint/explicit-function-return-type': 'off', // Can be verbose
    '@typescript-eslint/no-explicit-any': 'warn', // Warn instead of error for 'any'
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused vars
    'no-console': 'warn', // Warn about console.log statements
    // Add specific project rules here
  },
  ignorePatterns: ['.eslintrc.js', 'vite.config.ts', 'tailwind.config.js', 'postcss.config.js', 'dist/', 'node_modules/'], // Ignore build outputs and config files from linting themselves
};
