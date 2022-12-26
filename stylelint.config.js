module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
  ],
  plugins: ['@qcsfe/eslint-plugin-qcslint/stylelint'],
  rules: {
    'rule-empty-line-before': null,
    'function-comma-space-after': 'always',
    'selector-list-comma-newline-after': 'always',
    'color-hex-case': 'upper',
    'color-hex-length': 'long',
    'declaration-empty-line-before': 'never',
    'comment-empty-line-before': 'never',
    'block-closing-brace-empty-line-before': 'never',
    'no-eol-whitespace': true,
    'declaration-bang-space-before': 'always',
    'comment-whitespace-inside': 'always',
    'declaration-block-no-duplicate-properties': true,
    'value-list-comma-space-after': 'always',
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'value-list-comma-newline-after': null,
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['deep', '']
    }],
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['deep', '']
    }],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'extend', 'include', 'forward']
      }
    ],
  }
};
