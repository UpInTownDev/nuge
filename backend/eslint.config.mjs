/**
 * ESLint Configuration for Nuge Backend API
 * NestJS + TypeScript setup with strict rules
 */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      'coverage/**/*',
      '*.js',
      '*.mjs',
      'supabase/migrations/**/*',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  prettierConfig,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript specific rules (strict mode)
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      // '@typescript-eslint/prefer-const': 'error', // Disabled - conflicts with ESLint 9
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // NestJS specific rules
      '@typescript-eslint/parameter-properties': 'off', // Allow parameter properties in constructors
      '@typescript-eslint/no-parameter-properties': 'off',

      // General code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // Code organization and imports
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],

      // Security rules
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',

      // Performance rules
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-extra-boolean-cast': 'error',
      'no-irregular-whitespace': 'error',
      'valid-typeof': 'error',

      // Best practices for API development
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
      'require-await': 'error',
      'no-return-await': 'error',

      // Documentation rules
      'spaced-comment': ['error', 'always'],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'test/**/*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },
  {
    files: ['src/**/*.controller.ts'],
    rules: {
      // Controllers often have methods that don't explicitly return types due to decorators
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    files: ['src/**/*.dto.ts', 'src/**/*.entity.ts'],
    rules: {
      // DTOs and entities can have class properties without explicit types
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['src/**/*.module.ts'],
    rules: {
      // NestJS modules are often empty classes with decorators
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  }
);