import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-btn-download-language',
    templateUrl: './btn-download-language.component.html',
    styleUrls: ['./btn-download-language.component.scss'],
    standalone: false
})
export class BtnDownloadLanguageComponent {

  @Input() languageCode: string;

  constructor() {}

  downloadLanguage() {
    if (this.languageCode) {
      saveAs(`${environment.endPointApi}/language/${this.languageCode}/download`, `${this.languageCode}.json`);
    }
  }

}
