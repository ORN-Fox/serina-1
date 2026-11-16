import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DataAccessorService } from '@core/services/data-accessor/data-accessor.service';
import { LanguagesService } from '@core/services/languages/languages.service';
import { SettingsService } from '@core/services/settings/settings.service';

import { Language } from '@core/models/language/language.model';
import { Settings } from '@core/models/settings/settings.model';

import { ConfirmDialogActionEnum, ConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { DataManagerService } from '@core/services/data-manager/data-manager.service';
import { ItemType } from '@core/enums/itemType.enum';

interface IaddLanguageForm {
  code: string;
}

@Component({
    selector: 'app-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LanguagesComponent implements OnInit {

  public readonly dialog = Inject(MatDialog);
  readonly dataAccessorService = Inject(DataAccessorService);
  readonly languagesService = Inject(LanguagesService);
  readonly router = Inject(Router);
  readonly translateService = Inject(TranslateService);
  readonly settingsService = Inject(SettingsService);
  readonly snackBarService = Inject(MatSnackBar);

  @ViewChild('addLanguageForm') addLanguageForm!: NgForm;

  languages: Language[];
  languageCodes: string[];

  settings: Settings;

  constructor() {
    this.settings = this.settingsService.getSettings();
  }

  ngOnInit() {
    this.getLanguages();
  }

  getLanguages() {
    this.dataAccessorService.getLanguages().subscribe({
      next: (languagesJson: any[]) => {
        let languages: Language[] = [];
        languagesJson.forEach((languageJson) => {
          languages.push(new Language(languageJson.code, languageJson.nbTranslations));
        });
        this.languages = languages;
        this.languageCodes = this.languages.map((language) => language.code);
      },
      error: (response: Response) => {
        this.languages = [];

        this.snackBarService.open(this.translateService.instant('commons.toast.loadLanguages.fail'), undefined, { panelClass: 'app-notification-error' });
        console.error('Unable to retrieve languages', response);
      }
    });
  }

  openLanguage(languageCode: string) {
    this.languagesService.addLanguage(languageCode);
    if (!DataManagerService.findItem(this.settings.openedLanguages, languageCode, ItemType.Language)) {
      this.settings.openedLanguages.push(languageCode);
      this.settingsService.setSettings(this.settings);
    }
    this.router.navigate(['/language']);
  }

  addLanguage() {
    let addLanguageCode = (this.addLanguageForm.value as IaddLanguageForm).code;
    let languageNotExist = this.languages.filter((language) => language.code == addLanguageCode).length == 0;

    if (languageNotExist) {
      this.dataAccessorService.createLanguage(addLanguageCode).subscribe({
        next: () => {
          this.snackBarService.open(this.translateService.instant('commons.toast.addLanguage.success', { language: addLanguageCode }), undefined, { panelClass: 'app-notification-success' })
          this.addLanguageForm.resetForm();
          this.getLanguages();
        },
        error: (response: Response) => {
          this.snackBarService.open(this.translateService.instant('commons.toast.addLanguage.fail', { language: addLanguageCode }), undefined, { panelClass: 'app-notification-error' });
          console.error(`Unable to add language "${addLanguageCode}"`, response)
        }
      });
    } else {
      this.snackBarService.open(this.translateService.instant('commons.toast.addLanguage.langExist', { language: addLanguageCode }), undefined, { panelClass: 'app-notification-warning' });
    }
  }

  deleteLanguage(event: Event, languageCode: string) {
    event.stopPropagation();

    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((action: number) => {
      if (action == ConfirmDialogActionEnum.Validate) {
        this.dataAccessorService.deleteLanguage(languageCode).subscribe({
          next: () => {
            this.snackBarService.open(this.translateService.instant('commons.toast.deleteLanguage.success', { language: languageCode }), undefined, { panelClass: 'app-notification-success' });
            this.getLanguages();
          },
          error: (response: Response) => {
            this.snackBarService.open(this.translateService.instant('commons.toast.deleteLanguage.fail', { language: languageCode }), undefined, { panelClass: 'app-notification-error' });
            console.error(`Unable to delete language "${languageCode}"`, response);
          }
        });
      }
    });
  }

}
