import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash';

import { DataAccessorService } from '../../services/data-accessor/data-accessor.service';
import { DataManagerService } from '../../services/data-manager/data-manager.service';

import { Translation } from '../../models/translation/translation.model';

import { ConfirmDialogActionEnum, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ItemType } from '../../enums/itemType.enum';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnChanges {

  @Input() languages: string[];
  @Input() levels: string;
  @Input() translations: Translation[];
  originalTranslations: Translation[];

  constructor(
    public dialog: MatDialog,
    private dataAccessor: DataAccessorService,
    private dataManager: DataManagerService,
    private snackBarService: MatSnackBar,
    private translateService: TranslateService,
  ) {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);

    // $watch('this.translations', function (newValue, oldValue) {
  //   if (newValue !== oldValue && !_.isUndefined(oldValue)) {
  //     let nbEntitiesNotSave = 0
  //     for (let nbEntitiesNotSaveIterator = 0; nbEntitiesNotSaveIterator < newValue.length; nbEntitiesNotSaveIterator++) {
  //       if (!newValue[nbEntitiesNotSaveIterator].save) {
  //         nbEntitiesNotSave++
  //       }
  //     }

  //     for (let iterator = 0; iterator < oldValue.length; iterator++) {
  //       if (!_.isUndefined(newValue[iterator + nbEntitiesNotSave]) && (newValue[iterator + nbEntitiesNotSave].save && oldValue[iterator].save)) {
  //         if (!$rootScope.secondLanguageIsValid) {
  //           if (angular.equals(newValue[iterator + nbEntitiesNotSave].key, originalListTranslations[iterator].key) && angular.equals(newValue[iterator + nbEntitiesNotSave].value[0], originalListTranslations[iterator].value[0])) {
  //             this.translations[iterator].modified = false
  //           } else {
  //             this.translations[iterator].modified = true
  //             this.translations[iterator].originalKey = originalListTranslations[iterator].key
  //           }
  //         } else {
  //           if (angular.equals(newValue[iterator + nbEntitiesNotSave].key, originalListTranslations[iterator].key) && angular.equals(newValue[iterator + nbEntitiesNotSave].value[0], originalListTranslations[iterator].value[0])  && angular.equals(newValue[iterator + nbEntitiesNotSave].value[1], originalListTranslations[iterator].value[1])) {
  //             this.translations[iterator].modified = false
  //           } else {
  //             this.translations[iterator].modified = true
  //             this.translations[iterator].originalKey = originalListTranslations[iterator].key
  //           }
  //         }
  //       }
  //     }
  //   }
  // }, true)
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
      if (translation.key !== '' && translation.values[0] !== '' && !this.dataManager.findItem(this.translations, translation.key, ItemType.Translation)) {
        this.dataAccessor.createTranslation(this.languages, this.levels, translation).subscribe({
          next: () => {
            translation.save = true;
            this.originalTranslations = cloneDeep(this.translations);
            this.snackBarService.open(this.translateService.instant('commons.toast.addTranslation.success', { translation: translation.key }), undefined, { panelClass: 'app-notification-success' });
          },
          error: (error) => {
            this.snackBarService.open(this.translateService.instant('commons.toast.addTranslation.fail', { translation: translation.key }), undefined, { panelClass: 'app-notification-error' });
            console.error('Error while adding translation', error);
          }
        });
      } else {
        this.snackBarService.open(this.translateService.instant('commons.toast.addTranslation.translationExist', { translation: translation.key }), undefined, { panelClass: 'app-notification-error' });
        this.translations = this.dataManager.removeItem(this.translations, translation);
        this.originalTranslations = cloneDeep(this.translations);
      }
    } else {
      this.dataAccessor.updateTranslation(this.languages, this.levels, translation).subscribe({
        next: () => {
          translation.modified = false;
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
      this.translations = this.dataManager.removeItem(this.translations, translation);
    } else {
      this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((action: number) => {
        if (action == ConfirmDialogActionEnum.Validate) {
          this.dataAccessor.deleteTranslation(this.languages, this.levels, translation).subscribe({
            next: () => {
              this.translations = this.dataManager.removeItem(this.translations, translation);
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
