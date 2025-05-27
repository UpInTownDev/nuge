/**
 * @file jest.setup.js
 * @description Jest setup configuration for React Native and Expo testing
 * @author Nuge Development Team
 */

// Mock Expo modules
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      name: 'Nuge',
      slug: 'nuge-app',
    },
  },
}));

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  watchPositionAsync: jest.fn(),
}));

// Setup global test environment
global.__DEV__ = true;

// Setup test timeout
jest.setTimeout(10000);
