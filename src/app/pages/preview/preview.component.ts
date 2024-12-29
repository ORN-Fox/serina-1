import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import JSONFormatter from "json-formatter-js";

import { DataAccessorService } from 'src/app/core/services/data-accessor/data-accessor.service';

import { Language } from 'src/app/core/models/language/language.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  languages: Language[];
  languageCodes: string[];
  selectedLanguageCode: string;
  selectedLanguageTranslations: JSON;

  constructor(
    private dataAccessorService: DataAccessorService,
    private translateService: TranslateService,
    private snackBarService: MatSnackBar
  ) {}

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
        this.languageCodes = this.languages.map((language) => language.code);
      },
      error: (response) => {
        this.languages = [];

        this.snackBarService.open(this.translateService.instant('commons.toast.loadLanguages.fail'), undefined, { panelClass: 'app-notification-error' });
        console.error('Unable to retrieve languages', response);
      }
    });
  }

  previewLanguage(code: string) {
    this.selectedLanguageCode = code;

    this.dataAccessorService.openLanguage(this.selectedLanguageCode).subscribe({
      next: (translations) => {
        this.selectedLanguageTranslations = translations;

        const formatter = new JSONFormatter(this.selectedLanguageTranslations, 2);

        let previewElement = document.getElementById('jsonFormatterPreview');
        if (previewElement) {
          previewElement.innerHTML = "";
          previewElement.appendChild(formatter.render());
        }
      },
      error: (error) => {
        this.snackBarService.open(this.translateService.instant('commons.toast.loadLanguage.fail'), undefined, { panelClass: 'app-notification-error' });
        console.error(`Error on open language ${this.selectedLanguageCode}`, error);
      }
    });
  }

}
