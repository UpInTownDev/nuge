#!/bin/bash

# Setup Husky for development environments
# Skip in CI/CD environments where git hooks are not needed

if [ "$CI" = "true" ] || [ "$GITHUB_ACTIONS" = "true" ]; then
  echo "Skipping Husky setup in CI environment"
  exit 0
fi

# Check if .git directory exists (not in CI)
if [ ! -d ".git" ]; then
  echo "Not a git repository, skipping Husky setup"
  exit 0
fi

# Install Husky
npx husky install

echo "Husky setup completed successfully" 