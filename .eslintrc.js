module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': 0,
    'react/button-has-type': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-trailing-spaces': 0,
    'linebreak-style': 0,
    'react/forbid-prop-types': 0,
    'react/no-array-index-key': 1,
    'implicit-arrow-linebreak': 0,
  },
  globals: {
    window: true,
    document: true,
  },
  parser: 'babel-eslint',
};
