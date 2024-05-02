import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep, isObject, isUndefined } from 'lodash';

import { BreadcrumbService } from 'src/app/core/services/breadcrumb/breadcrumb.service';
import { DataAccessorService } from 'src/app/core/services/data-accessor/data-accessor.service';

import { Language } from 'src/app/core/models/language/language.model';
import { Translation } from 'src/app/core/models/translation/translation.model';
import { TranslationsGroup } from 'src/app/core/models/translations-group/translations-group.model';

import { MenuToolbarComponent } from 'src/app/core/components/menu-toolbar/menu-toolbar.component';

@Component({
  selector: 'app-translations-level',
  templateUrl: './translations-level.component.html',
  styleUrls: ['./translations-level.component.scss']
})
export class TransaltionsLevelComponent {

  languages: string[];
  language: Language;
  secondLanguage: Language;

  levels: string;

  translationsGroups: TranslationsGroup[];
  translations: Translation[];
  originalTranslations: Translation[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataAccessor: DataAccessorService
  ) {
    this.route.params.subscribe(params => {
      this.language = new Language(params['code'], 0);
      this.levels = params['levels'];

      if (this.secondLanguage) {
        MenuToolbarComponent.prototype.addBreadcrumbLevel(`${this.language.code} / ${this.secondLanguage.code}`, `/language/${this.language.code}`);
      } else {
        MenuToolbarComponent.prototype.addBreadcrumbLevel(this.language.code, `/language/${this.language.code}`);
      }

      this.languages = [this.language.code];

      // this.secondLanguage = SecondLanguage.definedSecondLanguage($rootScope.secondLanguage)
      if (this.secondLanguage) {
        this.languages.push(this.secondLanguage.code);
      }
      
      this.dataAccessor.openLanguage(this.languages[0]).subscribe({
        next: (response) => {
          this.getListGroupsAndTranslations(response, this.levels);
  
          // if (!isUndefined(this.secondLanguage) && this.secondLanguage.code.length === 5) {
          //   $rootScope.secondLanguageIsValid = true;
          //   this.recoverSecondaryLanguage(this.secondLanguage)
          // }
          // $rootScope.breadcrumb = BreadcrumbService.build($rootScope.breadcrumb, this.languages[0], this.levels)
        },
        error: (error) => {
          this.snackBarService.open(this.translateService.instant('commons.toast.loadLanguage.fail'), undefined, { panelClass: 'app-notification-error' });
          console.error('Error on open language ' + this.languages[0], error);
        }
      });
    });
  }

  getListGroupsAndTranslations(content: Object, levels: string | undefined) {
    console.log('getListGroupsAndTranslations', content, levels);
    
    this.translationsGroups = [];
    this.translations = [];
    this.originalTranslations = [];

    if (!isUndefined(levels)) {
      levels = levels.replace(/\//g, '.');
      content = eval('content.' + levels);
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

  goToBack() {
    MenuToolbarComponent.prototype.closeSearch();
    MenuToolbarComponent.prototype.clearBreadcrumb();

    let currentUrl = this.router.url;
    if (currentUrl === '/language/' + this.language.code) {
      this.router.navigate(['/languages']);
    } else {
      let currentUrlSplit = currentUrl.split('/');
      currentUrlSplit.pop();
      let newUrl = '';
      let iterator = 0;
      currentUrlSplit.forEach(level => {
        if (level === '') {
          newUrl += '/';
          iterator++;
        } else {
          newUrl += level;
          newUrl += iterator < currentUrlSplit.length - 1 ? '/' : '';
          iterator++;
        }
      })
      this.router.navigate([newUrl]);
    }
  }

}
