module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    plugins: [],
    rules: {
        'scss/at-mixin-argumentless-call-parentheses': 'always',
        'selector-class-pattern': [
            '^(([a-z][a-z0-9]*)(-[a-z0-9]+)*)|(mat-column-.+)$',
            {
                message: selector => `Expected class selector "${selector}" to be kebab-case`,
            },
        ],
        'selector-id-pattern': [
            '[a-z]+((\\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?',
            {
                message: selector => `Expected id selector "${selector}" to be lower camel case`,
            },
        ],
        'scss/dollar-variable-pattern': [
            '[a-z]+((\\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?',
            {
                message: selector => `Expected id selector "${selector}" to be lower camel case`,
            },
        ],
        'color-function-notation': 'legacy',
        'alpha-value-notation': 'number',
        'color-hex-length': 'long',
        "no-empty-source": null,
        'at-rule-empty-line-before': null,
        'scss/double-slash-comment-empty-line-before': null,
        'scss/dollar-variable-empty-line-before': null,
        'scss/at-extend-no-missing-placeholder': null,
        'scss/load-no-partial-leading-underscore': null,
        'no-descending-specificity': null,
        'function-url-quotes': 'never',
        'property-no-vendor-prefix': null,
        'value-keyword-case': null,
        'declaration-block-no-redundant-longhand-properties': null,
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['ng-deep'],
            },
        ],
    },
};
