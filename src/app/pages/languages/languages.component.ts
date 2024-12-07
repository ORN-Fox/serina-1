import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DataAccessorService } from 'src/app/core/services/data-accessor/data-accessor.service';
import { LanguagesService } from 'src/app/core/services/languages/languages.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

import { Language } from 'src/app/core/models/language/language.model';
import { Settings } from 'src/app/core/models/settings/settings.model';

import { ConfirmDialogActionEnum, ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { MenuToolbarComponent } from 'src/app/core/components/menu-toolbar/menu-toolbar.component';
import { DataManagerService } from 'src/app/core/services/data-manager/data-manager.service';
import { ItemType } from 'src/app/core/enums/itemType.enum';

interface IaddLanguageForm {
  code: string;
}

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @ViewChild('addLanguageForm') addLanguageForm!: NgForm;

  languages: Language[];

  settings: Settings;

  constructor(
    public dialog: MatDialog,
    private dataAccessorService: DataAccessorService,
    private languagesService: LanguagesService,
    private router: Router,
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private snackBarService: MatSnackBar
  ) {
    this.settings = this.settingsService.getSettings();
  }

  ngOnInit() {
    this.getLanguages();
  }

  getLanguages() {
    this.dataAccessorService.getLanguages().subscribe({
      next: (languagesJson) => {
        let languages: Language[] = [];
        languagesJson.forEach((languageJson) => {
          languages.push(new Language(languageJson.code, languageJson.nbTranslations));
        });
        this.languages = languages;
      },
      error: (response) => {
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
        error: (response) => {
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
          error:  (response) => {
            this.snackBarService.open(this.translateService.instant('commons.toast.deleteLanguage.fail', { language: languageCode }), undefined, { panelClass: 'app-notification-error' });
            console.error(`Unable to delete language "${languageCode}"`, response);
          }
        });
      }
    });
  }

}
