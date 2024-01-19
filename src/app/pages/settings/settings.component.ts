import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SettingsService } from 'src/app/core/services/settings/settings.service';

import { Settings, SettingLanguageDisplayFormat, SettingAppTheme } from 'src/app/core/models/settings/settings.model';

import { Language } from 'src/app/core/models/language/language.model';
import { LanguageDisplayFormat } from 'src/app/core/models/language-display-format/language-display-format.model';
import { Shortcut } from 'src/app/core/models/shortcut/shortcut.model';

import { MenuToolbarComponent } from 'src/app/core/components/menu-toolbar/menu-toolbar.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  languages: Language[];
  settings: Settings;
  shortcuts: Shortcut[];
  themes: string[];

  languageDisplayFormats: LanguageDisplayFormat[];

  constructor(
    private settingsService: SettingsService,
    private translateService: TranslateService
  ) {
    MenuToolbarComponent.prototype.addBreadcrumbLevel('sideMenu.settings', '/settings');
    this.settings = this.settingsService.getSettings();

    this.languageDisplayFormats = [
      new LanguageDisplayFormat(SettingLanguageDisplayFormat.Card, 'view_agenda'),
      new LanguageDisplayFormat(SettingLanguageDisplayFormat.List, 'list')
    ];

    this.languages = Settings.getAppLanguages();

    this.shortcuts = this.getShortcuts();

    this.themes = this.getThemes();
  }

  // Basic settings related

  changeLanguageDisplayFormat(format: LanguageDisplayFormat) {
    this.settings.selectedDisplayFormat = format.label;
    this.settingsService.setSettings(this.settings);
  }

  changeLocaleOfApplication(language: string) {
    if (language != this.settings.locale) {
      this.settings.locale = language;
      this.translateService.use(this.settings.locale);
      this.settingsService.setSettings(this.settings);
    }
  }

  changeKeepLanguagesEdit(keepLanguagesEdit: boolean) {
    this.settings.keepLanguagesEdit = keepLanguagesEdit
    this.settingsService.setSettings(this.settings);
  }

  // Shortcuts related

  getShortcuts(): Shortcut[] {
    return [
      new Shortcut('toggleSearchBar', 'F'),
      new Shortcut('navigateToPreviousCorrespondingItem', null, 'arrow_upward'),
      new Shortcut('navigateToNextCorrespondingItem', null, 'arrow_downward')
    ];
  }

  // Theming related

  getThemes() {
    return [
      SettingAppTheme.DeeppurpleAmber,
      SettingAppTheme.IndigoPink,
      SettingAppTheme.PinkBluegrey,
      SettingAppTheme.PurpleGreen
    ];
  }

  changeTheme(theme: string) {
    this.settings.theme = theme;
    this.settingsService.setSettings(this.settings);
    this.settingsService.setThemeApp();
  }

  // Advanced related

  toggleCustomTranslationsPathStatus(customTranslationsPathEnabled: boolean) {
    this.settings.customTranslationsPathEnabled = customTranslationsPathEnabled;
    this.settingsService.setSettings(this.settings, true);
  }

  saveCustomTranslationsPath(customTranslationsPath: string | null) {
    this.settings.customTranslationsPath = customTranslationsPath ? customTranslationsPath : '';
    this.settingsService.setSettings(this.settings, true);
  }

  toggleSortAscJson(enableSortAscJson: boolean) {
    this.settings.enableSortAscJson = enableSortAscJson
    this.settingsService.setSettings(this.settings, true);
  }

}
