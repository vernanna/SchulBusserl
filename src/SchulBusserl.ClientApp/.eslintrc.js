module.exports = {
    root: true,
    ignorePatterns: [],
    overrides: [
        {
            files: ['**/*.js'],
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        {
            files: ['**/*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.spec.json'],
                sourceType: 'module',
                createDefaultProgram: true,
            },
            plugins: [
                '@stylistic',
                '@typescript-eslint',
                '@angular-eslint',
                'prefer-arrow',
                '@ngrx',
                'rxjs',
            ],
            extends: [
                'eslint:recommended',
                'plugin:@stylistic/recommended-extends',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:@angular-eslint/recommended',
                'plugin:@angular-eslint/template/process-inline-templates',
                'plugin:@ngrx/all',
                'plugin:rxjs/recommended',
            ],
            rules: {
                '@angular-eslint/directive-selector': [
                    'error',
                    { type: 'attribute', prefix: undefined, style: 'camelCase' },
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    { type: 'element', prefix: 'app', style: 'kebab-case' },
                ],

                eqeqeq: ['error', 'always', { null: 'ignore' }],
                '@angular-eslint/prefer-on-push-component-change-detection': 'error',
                '@angular-eslint/prefer-inject': 'error',
                '@angular-eslint/prefer-standalone': 'error',
                '@angular-eslint/no-input-rename': 'off',

                'rxjs/no-implicit-any-catch': 'error',
                'rxjs/no-unsafe-takeuntil': 'error',
                'rxjs/no-unsafe-first': 'error',
                'rxjs/no-unsafe-switchmap': 'error',

                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/unbound-method': 'off',
                '@typescript-eslint/no-unused-vars': 'error',
                '@typescript-eslint/no-empty-object-type': 'off',

                quotes: ['error', 'single', { allowTemplateLiterals: true }],
                'no-multi-spaces': 'error',
                'no-trailing-spaces': 'error',
                'space-in-parens': 'error',
                'space-before-function-paren': ['error', 'never'],
                'space-before-blocks': 'error',
                'no-multiple-empty-lines': ['error', { max: 1 }],
                'brace-style': 'error',
                'object-curly-spacing': ['error', 'always'],
                'object-property-newline': [
                    'error',
                    { allowAllPropertiesOnSameLine: true },
                ],
                'array-bracket-spacing': ['error', 'never'],
                'array-element-newline': ['error', 'consistent'],
                'array-bracket-newline': ['error', 'consistent'],
                'function-paren-newline': 'off',
                'comma-spacing': 'error',
                'comma-style': 'error',
                'comma-dangle': ['error', 'always-multiline'],
                'operator-linebreak': [
                    'error',
                    'after',
                    { overrides: { '?': 'before', ':': 'before', '??': 'before' } },
                ],

                '@stylistic/semi': ['error', 'always'],
                '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: true }],
                '@stylistic/arrow-parens': ['error', 'as-needed'],
                '@stylistic/quote-props': ['error', 'as-needed'],
                '@stylistic/brace-style': [
                    'error',
                    '1tbs',
                    { allowSingleLine: true },
                ],
                '@stylistic/no-multiple-empty-lines': [
                    'error',
                    { max: 1, maxEOF: 1, maxBOF: 0 },
                ],
                '@stylistic/member-delimiter-style': [
                    'error',
                    {
                        multiline: { delimiter: 'semi', requireLast: true },
                        singleline: { delimiter: 'semi', requireLast: true },
                        multilineDetection: 'brackets',
                    },
                ],
            },
        },
        {
            files: ['**/*.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {
                '@angular-eslint/template/attributes-order': 'error',
                '@angular-eslint/template/no-duplicate-attributes': 'error',
                '@angular-eslint/template/eqeqeq': [
                    'error',
                    { allowNullOrUndefined: true },
                ],
                '@angular-eslint/template/prefer-self-closing-tags': 'error',
            },
        },
    ],
};
