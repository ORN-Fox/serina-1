import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-btn-download-language',
  templateUrl: './btn-download-language.component.html',
  styleUrls: ['./btn-download-language.component.scss']
})
export class BtnDownloadLanguageComponent {

  @Input() languageCode: string;

  constructor() {}

  downloadLanguage() {
    saveAs(`${environment.endPointApi}/language/${this.languageCode}/download`, `${this.languageCode}.json`);
  }

}
