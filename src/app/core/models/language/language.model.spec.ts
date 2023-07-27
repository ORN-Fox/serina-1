import { Language } from './language.model';

describe('Language', () => {
  it('should create an instance', () => {
    expect(new Language('en-CA', 20)).toBeTruthy();
  });
});
