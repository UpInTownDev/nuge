# Git Hooks and Linting Setup Test

This file is created to test our git hooks configuration.

## Features Configured

### Git Hooks (Husky)

- ✅ Pre-commit: Runs linting and formatting on staged files
- ✅ Commit-msg: Validates commit message format using commitlint
- ✅ Pre-push: Runs comprehensive tests before pushing

### ESLint Configuration

- ✅ Mobile: React Native + TypeScript + Expo rules
- ✅ Backend: NestJS + TypeScript strict mode

### Prettier Configuration

- ✅ Consistent formatting across mobile and backend
- ✅ Integrated with ESLint

### Testing

- ✅ Jest setup for mobile with React Native Testing Library
- ✅ Backend testing configuration

## Usage

```bash
# Run linting
npm run lint

# Run formatting
npm run format

# Test git hooks
git add .
git commit -m "feat: test commit message format"
```
