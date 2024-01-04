import { Component, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

import { DataAccessorService } from '../../services/data-accessor/data-accessor.service';

@Component({
  selector: 'app-btn-download-language',
  templateUrl: './btn-download-language.component.html',
  styleUrls: ['./btn-download-language.component.scss']
})
export class BtnDownloadLanguageComponent {

  @Input() languageCode: string;

  constructor(
    private dataAccessorService: DataAccessorService
  ) {}

  downloadLanguage() {
    // TODO replace angular jquery like by saveAs lib or vanilla solution
    // this.dataAccessorService.downloadLanguage(this.languageCode).subscribe(() => {
    //   var anchor = angular.element('<a/>')
    //   anchor.attr({
    //     href: `${environment.endPointApi}/download/${this.languageCode}`,
    //     target: '_blank',
    //     rel: 'noopener',
    //     download: 'translation.json'
    //   })[0].click();
    // }, () => {

    // });
  }

}
