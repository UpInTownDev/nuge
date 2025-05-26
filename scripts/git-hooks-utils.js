#!/usr/bin/env node

/**
 * Git Hooks Utilities for Nuge Project
 * Provides colored output and structured logging for git hooks
 */

const chalk = require('chalk');
const { execSync } = require('child_process');

// ANSI color codes for better visibility
const colors = {
  info: chalk.blue,
  success: chalk.green,
  warning: chalk.yellow,
  error: chalk.red,
  debug: chalk.gray,
  title: chalk.cyan.bold,
  subtitle: chalk.white.bold,
  muted: chalk.gray,
};

/**
 * Logger utility with different levels and colors
 */
class Logger {
  static info(message, prefix = 'INFO') {
    console.log(`${colors.info('ℹ')} ${colors.debug(`[${prefix}]`)} ${message}`);
  }

  static success(message, prefix = 'SUCCESS') {
    console.log(`${colors.success('✓')} ${colors.debug(`[${prefix}]`)} ${message}`);
  }

  static warning(message, prefix = 'WARNING') {
    console.log(`${colors.warning('⚠')} ${colors.debug(`[${prefix}]`)} ${message}`);
  }

  static error(message, prefix = 'ERROR') {
    console.log(`${colors.error('✗')} ${colors.debug(`[${prefix}]`)} ${message}`);
  }

  static debug(message, prefix = 'DEBUG') {
    if (process.env.DEBUG === 'true') {
      console.log(`${colors.debug('•')} ${colors.debug(`[${prefix}]`)} ${colors.debug(message)}`);
    }
  }

  static title(message) {
    console.log(`\n${colors.title('═══ ' + message + ' ═══')}`);
  }

  static subtitle(message) {
    console.log(`\n${colors.subtitle('── ' + message + ' ──')}`);
  }

  static step(step, total, message) {
    console.log(`${colors.info(`[${step}/${total}]`)} ${message}`);
  }
}

/**
 * Execute command with proper error handling and output
 */
function executeCommand(command, options = {}) {
  const { silent = false, cwd = process.cwd(), description } = options;
  
  try {
    if (description && !silent) {
      Logger.debug(`Executing: ${description}`, 'EXEC');
    }
    
    const result = execSync(command, {
      cwd,
      encoding: 'utf8',
      stdio: silent ? 'pipe' : 'inherit',
    });
    
    return { success: true, output: result };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      code: error.status,
      output: error.stdout || error.stderr || ''
    };
  }
}

/**
 * Get current git information
 */
function getGitInfo() {
  try {
    let branch = 'main';
    try {
      branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch (error) {
      // Fallback to checking git status for branch name
      try {
        const status = execSync('git status --porcelain=v1 -b', { encoding: 'utf8' });
        const branchMatch = status.match(/## (.+)/);
        if (branchMatch) {
          branch = branchMatch[1].split('...')[0];
        }
      } catch (statusError) {
        Logger.warning('Could not determine branch name, using default: main', 'GIT');
      }
    }
    
    let commit = 'initial';
    try {
      commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    } catch (error) {
      // This is likely the first commit, so HEAD doesn't exist yet
      Logger.info('No previous commits found (initial commit)', 'GIT');
    }
    
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
    
    return { branch, commit, stagedFiles };
  } catch (error) {
    Logger.error(`Failed to get git information: ${error.message}`, 'GIT');
    return null;
  }
}

/**
 * Check if files match patterns
 */
function hasChangesInPaths(stagedFiles, patterns) {
  return patterns.some(pattern => 
    stagedFiles.some(file => file.match(new RegExp(pattern)))
  );
}

/**
 * Format duration in human readable format
 */
function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

/**
 * Timer utility for measuring execution time
 */
class Timer {
  constructor() {
    this.start = Date.now();
  }

  elapsed() {
    return Date.now() - this.start;
  }

  elapsedFormatted() {
    return formatDuration(this.elapsed());
  }
}

module.exports = {
  Logger,
  executeCommand,
  getGitInfo,
  hasChangesInPaths,
  formatDuration,
  Timer,
  colors,
}; 