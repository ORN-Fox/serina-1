import { Translation } from "./translation.model";

describe('Translation', () => {
  it('should create an instance', () => {
    expect(new Translation('hello', ['hello'])).toBeTruthy();
  });
});
