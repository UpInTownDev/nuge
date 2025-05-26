/**
 * Jest Setup for Nuge Mobile App
 * Configures testing environment for React Native + Expo
 */

// Mock expo modules
jest.mock('expo-constants', () => ({
  manifest: {},
  platform: {
    ios: null,
    android: {},
  },
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock react-native modules
jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  ReactNative.Dimensions = {
    get: jest.fn(() => ({ width: 375, height: 812 })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  return ReactNative;
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock location services
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 50.8503396,
        longitude: 4.3517103,
        accuracy: 10,
      },
    })
  ),
}));

// Global test utilities
global.__DEV__ = true;

// Silence warnings for tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});

// Setup test timeout
jest.setTimeout(10000); 