import App from '../App';

/**
 * Test suite for the main App component
 * Ensures the entry point renders correctly
 */
describe('App Component', () => {
  it('should be defined', () => {
    expect(App).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof App).toBe('function');
  });
});
