import { Component, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash';

import { DataAccessorService } from '@core/services/data-accessor/data-accessor.service';
import { DataManagerService } from '@core/services/data-manager/data-manager.service';
import { LanguagesService } from '@core/services/languages/languages.service';

import { ItemType } from '@core/enums/itemType.enum';

import { Translation } from '@core/models/translation/translation.model';

import { ConfirmDialogActionEnum, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-translations',
    templateUrl: './translations.component.html',
    styleUrls: ['./translations.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TranslationsComponent implements OnInit {

  public readonly dialog = inject(MatDialog);
  readonly dataAccessor = inject(DataAccessorService);
  readonly languagesService = inject(LanguagesService);
  readonly translateService = inject(TranslateService);
  readonly snackBarService = inject(MatSnackBar);

  @Input() languages: string[];
  @Input() translations: Translation[];

  originalTranslations: Translation[];

  constructor() { }

  ngOnInit() {
    this.originalTranslations = cloneDeep(this.translations);
  }

  addTranslation() {
    this.translations.unshift(new Translation('', []));
  }

  duplicateTranslation(translation: Translation) {
    this.translations.unshift(translation.duplicate());
  }

  generatePluralTranslation(translation: Translation) {
    this.translations.unshift(translation.generatePlural());
  }

  moveTranslation(translation: Translation) {
    console.log('TODO - move translation', translation);
  }

  saveTranslation(translation: Translation) {
    if (!translation.save) {
      if (translation.isValid() && !DataManagerService.findItem(this.translations, translation.key, ItemType.Translation)) {
        this.dataAccessor.createTranslation(this.languages, this.languagesService.getLevelsConcatened(), translation).subscribe({
          next: () => {
            translation.applySave();
            this.originalTranslations = cloneDeep(this.translations);
            this.snackBarService.open(this.translateService.instant('commons.toast.addTranslation.success', { translation: translation.key }), undefined, { panelClass: 'app-notification-success' });
          },
          error: (error) => {
            this.snackBarService.open(this.translateService.instant('commons.toast.addTranslation.fail', { translation: translation.key }), undefined, { panelClass: 'app-notification-error' });
            console.error('Error while adding translation', error);
          }
        });
      } else {
        this.snackBarService.open(this.translateService.instant('commons.toast.addTranslation.translationExist', { translation: translation.key }), undefined, { panelClass: 'app-notification-warning' });
      }
    } else {
      this.dataAccessor.updateTranslation(this.languages, this.languagesService.getLevelsConcatened(), translation).subscribe({
        next: () => {
          translation.applySave();
          this.originalTranslations = cloneDeep(this.translations);
          this.snackBarService.open(this.translateService.instant('commons.toast.majTranslation.success', { translation: translation.key }), undefined, { panelClass: 'app-notification-success' });
        },
        error: (error) => {
          this.snackBarService.open(this.translateService.instant('commons.toast.majTranslation.fail', { translation: translation.key }), undefined, { panelClass: 'app-notification-error' });
          console.error('Error while update translation', error);
        }
      });
    }
  }

  deleteTranslation(translation: Translation) {
    if (!translation.save) {
      this.translations = DataManagerService.removeItem(this.translations, translation);
    } else {
      this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((action: number) => {
        if (action == ConfirmDialogActionEnum.Validate) {
          this.dataAccessor.deleteTranslation(this.languages, this.languagesService.getLevelsConcatened(), translation).subscribe({
            next: () => {
              this.translations = DataManagerService.removeItem(this.translations, translation);
              this.originalTranslations = cloneDeep(this.translations);
              this.snackBarService.open(this.translateService.instant('commons.toast.deleteTranslation.success', { translation: translation.key }), undefined, { panelClass: 'app-notification-success' });
            },
            error: (error) => {
              this.snackBarService.open(this.translateService.instant('commons.toast.deleteTranslation.fail', { translation: translation.key }), undefined, { panelClass: 'app-notification-error' });
              console.error('Unable to delete translation', error);
            }
          });
        }
      });
    }
  }

  // Translations component events related

  onSaveTranslation(event: { translation: Translation; }) {
    this.saveTranslation(event.translation);
  }

  onMoveTranslation(event: { translation: Translation; }) {
    this.moveTranslation(event.translation);
  }

  onGeneratePluralTranslation(event: { translation: Translation; }) {
    this.generatePluralTranslation(event.translation);
  }

  onDuplicateTranslation(event: { translation: Translation; }) {
    this.duplicateTranslation(event.translation);
  }

  onDeleteTranslation(event: { translation: Translation; }) {
    this.deleteTranslation(event.translation);
  }

}
