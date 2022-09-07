module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error'],
    // max line length of 80
    'max-len': ['error', { 'code': 80 }]
  },
  'overrides': [
    {
      'files': ['./**/*.ts', './**/*.tsx'],
      'extends': [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      'parser': '@typescript-eslint/parser',
      'plugins': ['@typescript-eslint']
    }
  ]
};
