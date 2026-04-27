import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, isObject } from 'lodash';

import { BreadcrumbService } from 'src/app/core/services/breadcrumb/breadcrumb.service';
import { DataAccessorService } from 'src/app/core/services/data-accessor/data-accessor.service';
import { DataManagerService } from 'src/app/core/services/data-manager/data-manager.service';
import { LanguagesService } from 'src/app/core/services/languages/languages.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

import { Language } from 'src/app/core/models/language/language.model';
import { Settings } from 'src/app/core/models/settings/settings.model';
import { Translation } from 'src/app/core/models/translation/translation.model';
import { TranslationsGroup } from 'src/app/core/models/translations-group/translations-group.model';

import { MenuToolbarComponent } from 'src/app/core/components/menu-toolbar/menu-toolbar.component';

@Component({
    selector: 'app-translations-level',
    templateUrl: './translations-level.component.html',
    styleUrls: ['./translations-level.component.scss'],
    standalone: false
})
export class TransaltionsLevelComponent {

  languages: string[];
  language: Language;
  secondLanguage: Language;

  levels: string[];

  contentSource: any;

  translationsGroups: TranslationsGroup[];
  translations: Translation[];
  originalTranslations: Translation[];

  settings: Settings;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private dataAccessor: DataAccessorService,
    private languagesService: LanguagesService,
    private settingsService: SettingsService,
    private snackBarService: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.settings = this.settingsService.getSettings();

    this.languages = this.languagesService.getLanguages();
    this.language = new Language(this.languages[0], 0);
    this.levels = this.languagesService.getLevels();

    if (this.secondLanguage) {
      this.languagesService.addLanguage(this.secondLanguage.code)
    } else {
    }

    this.dataAccessor.openLanguage(this.languages[0]).subscribe({
      next: (response) => {
        this.contentSource = response;
        console.log('levels', this.languagesService.getLevels());

        this.getListGroupsAndTranslations(response, this.languagesService.getLevels());

        // if (!isUndefined(this.secondLanguage) && this.secondLanguage.code.length === 5) {
        //   $rootScope.secondLanguageIsValid = true;
        //   this.recoverSecondaryLanguage(this.secondLanguage)
        // }
        // $rootScope.breadcrumb = BreadcrumbService.build($rootScope.breadcrumb, this.languages[0], this.levels)
      },
      error: (error) => {
        this.snackBarService.open(this.translateService.instant('commons.toast.loadLanguage.fail'), undefined, { panelClass: 'app-notification-error' });
        console.error(`Error on open language ${this.languages[0]}`, error);
      }
    });
  }

  getListGroupsAndTranslations(content: Object, levels: string[]) {
    console.log('getListGroupsAndTranslations', content, levels);

    this.translationsGroups = [];
    this.translations = [];
    this.originalTranslations = [];

    if (levels.length > 0) {
      content = DataManagerService.getItem(content, levels);
      console.log('result', content);
    }

    for (const [key, value] of Object.entries(content)) {
      if (isObject(value)) {
        let translationsGroup = new TranslationsGroup(key);
        this.translationsGroups.push(translationsGroup);
      } else {
        let translation = new Translation(key, [value], true);
        this.translations.push(translation);
      }
    }

    this.originalTranslations = cloneDeep(this.translations);
  }

  onOpenTranslationGroup(event: { groupName: string }) {
    console.log('levels', this.languagesService.getLevels());
    let groupName = event.groupName;
    MenuToolbarComponent.prototype.closeSearch();
    // MenuToolbarComponent.prototype.addBreadcrumbLevel(groupName, groupName);
    this.languagesService.addLevel(groupName);
    this.settings.openedLevels.push(event.groupName);
    this.settingsService.setSettings(this.settings);
    console.log('levels', this.languagesService.getLevels());
    this.getListGroupsAndTranslations(this.contentSource, this.languagesService.getLevels());
  }

  goToBack() {
    MenuToolbarComponent.prototype.closeSearch();

    console.log('current levels', this.languagesService.getLevels());

    if (this.languagesService.getLevels().length == 0) {
      console.log('1');
      this.languagesService.clear();
      if (!this.settings.keepLanguagesEdit) {
        this.settings.openedLanguages = [];
      }
      this.settings.openedLevels = [];
      this.settingsService.setSettings(this.settings);
      this.router.navigate(['/languages']);
    } else {
      this.languagesService.removeLastLevel();
      this.settings.openedLevels.pop();
      this.settingsService.setSettings(this.settings);
      console.log('2', this.languagesService.getLastLevel());

      this.getListGroupsAndTranslations(this.contentSource, this.languagesService.getLevels());
    }
  }

}
