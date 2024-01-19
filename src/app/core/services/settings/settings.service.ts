import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { DataAccessorService } from '../data-accessor/data-accessor.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

import { Settings } from '../../models/settings/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  keySettingsApp: string;
  private settings: Settings;

  constructor(
    private _snackBar: MatSnackBar,
    private translateService: TranslateService,
    private dataAccessor: DataAccessorService,
    private localStorage: LocalStorageService
  ) {
    this.keySettingsApp = 'serinaSettings';
  }

  initSettings() {
    if (this.localStorage.isItemExist(this.keySettingsApp)) {
      let storedSettings = this.localStorage.getItem(this.keySettingsApp);
      this.settings = new Settings(
        storedSettings.customTranslationsPathEnabled,
        storedSettings.customTranslationsPath,
        storedSettings.enableSortAscJson,
        storedSettings.keepLanguagesEdit,
        storedSettings.locale,
        storedSettings.theme,
        storedSettings.selectedDisplayFormat
      );

      let customTranslationsPath = this.settings.customTranslationsPathEnabled && this.settings.customTranslationsPath ? this.settings.customTranslationsPath : '-1'
      this.dataAccessor.updateAdvancedSettings(customTranslationsPath, this.settings.enableSortAscJson).subscribe({
        next: () => {
          console.debug('Advanced settings is successfully settled');
        },
        error: (response) => {
          this._snackBar.open(this.translateService.instant('commons.toast.advancedSettings.fail'), undefined, { panelClass: 'app-notification-error' });
          console.error('Unable to set advanced settings', response);
        }
      });
    } else {
      this.settings = new Settings();
      this.localStorage.setItem(this.keySettingsApp, this.settings);
    }

    this.translateService.use(this.settings.locale);
  }

  getSettings(): Settings {
    if (!this.settings) {
      this.initSettings();
    }
    return this.settings;
  }

  setSettings(settings: Settings, setAdvancedSettings: boolean = false) {
    this.settings = settings;
    this.localStorage.setItem(this.keySettingsApp, settings);

    if (setAdvancedSettings) {
      let customTranslationsPath = this.settings.customTranslationsPathEnabled && this.settings.customTranslationsPath ? this.settings.customTranslationsPath : '-1'
      this.dataAccessor.updateAdvancedSettings(customTranslationsPath, this.settings.enableSortAscJson).subscribe({
        next: () => {
          console.debug('Advanced settings is successfully settled');
        },
        error: (response) => {
          this._snackBar.open(this.translateService.instant('commons.toast.advancedSettings.fail'), undefined, { panelClass: 'app-notification-error' });
          console.error('Unable to set advanced settings', response);
        }
      });
    }
  }

  setThemeApp() {
    let themeAppLinkElement = document.getElementById("themeApp") as HTMLLinkElement;
    themeAppLinkElement.rel = "stylesheet";
    themeAppLinkElement.href = `/assets/styles/vendor/angular-material-prebuilt-themes/${this.settings.theme}.css`;
  }

}