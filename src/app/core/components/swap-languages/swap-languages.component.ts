import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { DataAccessorService } from '../../services/data-accessor/data-accessor.service';

@Component({
  selector: 'app-swap-languages',
  templateUrl: './swap-languages.component.html',
  styleUrls: ['./swap-languages.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SwapLanguagesComponent {
  @Input() languageCode: string = '';
  @Input() secondLanguageCode: string = '';
  @Input() disabledSwap: boolean = false;
  
  @Output() swapLanguagesEvent: EventEmitter<void> = new EventEmitter();
  @Output() confirmSecondLanguageEvent: EventEmitter<{ languageCode: string }> = new EventEmitter();
  
  selectedSecondLanguageCode: string = '';
  languagesForSwap: { code: string }[] = [];
  
  constructor(
    private dataAccessorService: DataAccessorService,
    private translateService: TranslateService,
    private snackBarService: MatSnackBar
  ) {
    this.getLanguages();
  }

  getLanguages() {
    this.dataAccessorService.getLanguages().subscribe({
      next: (languagesJson) => {
        languagesJson.forEach((languageJson) => {
          if (languageJson.code !== this.languageCode) {
            this.languagesForSwap.push({ code: languageJson.code });
          }
        });
      },
      error: (response) => {
        this.languagesForSwap = [];
        this.snackBarService.open(this.translateService.instant('commons.toast.loadLanguages.fail'), undefined, { panelClass: 'app-notification-error' });
        console.error('Unable to retrieve languages for swap', response);
      }
    });
  }

  onSecondLanguageCodeChange(event: MatSelectChange<string>) {
    this.selectedSecondLanguageCode = event.value;
  }

  swapLanguages() {
    this.swapLanguagesEvent.emit();
  }

  confirmSecondLanguage() {
    this.confirmSecondLanguageEvent.emit({ languageCode: this.selectedSecondLanguageCode });
  }
}
