module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // "extends": [
  //     "eslint:recommended",
  //     "plugin:@typescript-eslint/recommended",
  //     "plugin:react/recommended"
  // ],
  // "extends": [
  //     "airbnb",
  //     "airbnb/hooks",
  //     "plugin:react/recommended",
  //     "plugin:@typescript-eslint/recommended",
  // ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {},
}

// extends: [ 'plugin:prettier/recommended']
// plugins: ['react', '@typescript-eslint', 'prettier'],
