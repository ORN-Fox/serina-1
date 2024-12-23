import { Component, EventEmitter, Output } from '@angular/core';

import { DataAccessorService } from '../../services/data-accessor/data-accessor.service';

@Component({
  selector: 'app-language-file-upload',
  templateUrl: './language-file-upload.component.html',
  styleUrl: './language-file-upload.component.scss'
})
export class LanguageFileUploadComponent {

  @Output() LanguageFileUploadComponentDidUploadEvent: EventEmitter<void> = new EventEmitter();

  uploadedFiles: Array<File>;

  constructor(
    private dataAccessorService: DataAccessorService
  ) {
    this.uploadedFiles =  [];
  }

  upload(files: File[]) {
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];

        this.dataAccessorService.importLanguage(file).subscribe({
          next: () => {
            this.uploadedFiles = this.uploadedFiles.slice(1);
            if (this.uploadedFiles.length == 0) {
              this.LanguageFileUploadComponentDidUploadEvent.emit();
              return;
            }
          },
          error: (response) => {
            console.error('File import as failed', response);
          }
        });

      }
    }
  }

  clear() {
    this.uploadedFiles = [];
  }

}
