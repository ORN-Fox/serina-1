import { Shortcut } from "./shortcut.model";

describe('Shortcut', () => {
  it('should create an instance', () => {
    expect(new Shortcut('Push ENTER to confirm')).toBeTruthy();
  });
});
