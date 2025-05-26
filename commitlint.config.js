/**
 * Commitlint Configuration for Nuge Project
 * Ensures consistent commit message format
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, semicolons, etc)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding or modifying tests
        'build', // Build system or external dependencies
        'ci', // CI/CD pipeline changes
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverting previous commits
        'wip', // Work in progress
        'hotfix', // Critical bug fixes for production
        'release', // Release related changes
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'mobile', // Mobile app changes
        'ci-cd', // CI/CD changes
        'backend', // Backend API changes
        'shared', // Shared utilities/types
        'deps', // Dependencies
        'config', // Configuration changes
        'scripts', // Build/deployment scripts
        'docs', // Documentation
        'vendors', // Vendor management features
        'orders', // Order management features
        'auth', // Authentication features
        'maps', // Map/location features
        'payments', // Payment integration
        'realtime', // Real-time features
        'i18n', // Internationalization
        'ui', // UI components
        'api', // API endpoints
        'db', // Database changes
        'tests', // Test-related changes
      ],
    ],
    'subject-case': [2, 'always', ['lower-case', 'upper-case']],
    'header-max-length': [0, 'never'],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  },
};
