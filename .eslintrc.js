const prettierConfig = require('./.prettierrc.js');
module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['warn', prettierConfig],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/no-unstable-nested-components': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off',
  },
};
