import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { DataAccessorService } from '../../services/data-accessor/data-accessor.service';

@Component({
  selector: 'app-language-file-upload',
  templateUrl: './language-file-upload.component.html',
  styleUrl: './language-file-upload.component.scss'
})
export class LanguageFileUploadComponent {

  @Input() existingLanguageCodes: string[];

  @Output() LanguageFileUploadComponentDidUploadEvent: EventEmitter<void> = new EventEmitter();

  uploadedFiles: Array<File>;

  constructor(
    private dataAccessorService: DataAccessorService,
    private translateService: TranslateService,
    private snackBarService: MatSnackBar
  ) {
    this.uploadedFiles =  [];
  }

  upload(files: File[]) {
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        const addLanguageCode = file.name.replace('.json', '');

        if (this.existingLanguageCodes.indexOf(addLanguageCode) != -1) {
          this.snackBarService.open(this.translateService.instant('commons.toast.addLanguage.langExist', { language: addLanguageCode }), undefined, { panelClass: 'app-notification-warning' });
          this.uploadedFiles = this.uploadedFiles.slice(1);
          continue;
        }

        this.dataAccessorService.importLanguage(file).subscribe({
          next: () => {
            this.uploadedFiles = this.uploadedFiles.slice(1);
            this.snackBarService.open(this.translateService.instant('commons.toast.addLanguage.success', { language: addLanguageCode }), undefined, { panelClass: 'app-notification-success' })

            if (this.uploadedFiles.length == 0) {
              this.LanguageFileUploadComponentDidUploadEvent.emit();
              return;
            }
          },
          error: (response) => {
            this.snackBarService.open(this.translateService.instant('commons.toast.addLanguage.fail', { language: addLanguageCode }), undefined, { panelClass: 'app-notification-error' });
            console.error(`Unable to add language "${addLanguageCode}"`, response)
          }
        });
      }
    }
  }

  clear() {
    this.uploadedFiles = [];
  }

}
