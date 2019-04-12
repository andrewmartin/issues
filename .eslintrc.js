module.exports = {
  plugins: ['prettier', 'react', 'jsx-a11y'],
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    jest: true,
  },
  globals: {
    window: true,
    document: true,
    navigator: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
        extensions: ['.js', '.jsx', '.scss'],
      },
    },
  },
  rules: {
    camelcase: 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-sort-props': 2,
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'es5',
        jsxBracketSameLine: true,
      },
    ],
  },
};
