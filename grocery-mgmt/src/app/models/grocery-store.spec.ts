import { GroceryStore } from './grocery-store';

describe('GroceryStore', () => {
  it('should create an instance', () => {
    expect(new GroceryStore(1, 'Publix', 'A Place')).toBeTruthy();
  });
});
