module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-hangul': (parsed, when = 'always') => {
          const hasHangul = /[가-힣]/.test(parsed.subject || '')
          const valid = when === 'always' ? hasHangul : !hasHangul

          return [valid, '커밋은 한국어로 작성해주세요.']
        },
      },
    },
  ],
  rules: {
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'scope-empty': [2, 'always'],
    'subject-hangul': [2, 'always'],
  },
}
