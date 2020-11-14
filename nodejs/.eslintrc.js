module.exports = {
    'env': {
        'node': true,
        'es6': true,
        'commonjs': true,
    },
    'extends': 'google',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rule': {
        'no-dupe-keys': 1,
        'no-extra-semi': 1,
        'no-duplicate-case': 1,
        'no-func-assign': 1,
        'no-invalid-regexp': 1,
        'no-irregular-whitespace': 1,
        'valid-typeof': 1,
        'eqeqeq': [1, 'smart'],
        'no-multi-spaces': 1,
        'no-redeclare': 1,
        'yoda': 1,
        'global-require': 1,
        'array-bracket-spacing': [1, 'never'],
        'comma-style': [1, 'last'],
        'quotes': [1, 'single', { 'avoidEscape': true }, { 'allowTemplateLiterals': true }],
        'semi': [1, 'always'],
        'no-arrow-condition': 1,
        'no-const-assign': 1,
        'no-var': 1,
    }
};
