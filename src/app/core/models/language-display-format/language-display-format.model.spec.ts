import { LanguageDisplayFormat } from './language-display-format.model';
import { SettingLanguageDisplayFormat } from '../settings/settings.model';

describe('LanguageDisplayFormat', () => {
  it('should create an instance', () => {
    expect(new LanguageDisplayFormat(SettingLanguageDisplayFormat.Card, 'view_agenda')).toBeTruthy();
  });
});
