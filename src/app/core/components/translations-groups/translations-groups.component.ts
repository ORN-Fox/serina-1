import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { DataAccessorService } from '../../services/data-accessor/data-accessor.service';
import { DataManagerService } from '../../services/data-manager/data-manager.service';
import { LanguagesService } from '../../services/languages/languages.service';

import { ItemType } from '../../enums/itemType.enum';

import { Translation } from '../../models/translation/translation.model';
import { TranslationsGroup } from '../../models/translations-group/translations-group.model';

import { ConfirmDialogActionEnum, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CrudTranslationGroupDialogComponent } from '../crud-translation-group-dialog/crud-translation-group-dialog.component';
import { MenuToolbarComponent } from '../menu-toolbar/menu-toolbar.component';

@Component({
    selector: 'app-translations-groups',
    templateUrl: './translations-groups.component.html',
    styleUrls: ['./translations-groups.component.scss'],
    standalone: false
})
export class TranslationsGroupsComponent {

  @Input() languages: string[];
  @Input() translations: Translation[];
  @Input() translationsGroups: TranslationsGroup[];

  @Output() TranslationsGroupsComponentDidOpenGroupEvent: EventEmitter<{ groupName: string }> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private dataAccessor: DataAccessorService,
    private languagesService: LanguagesService,
    private snackBarService: MatSnackBar,
    private translateService: TranslateService,
  ) {

  }

  openDialogAddTranslationsGroup() {
    let dialogRef = this.dialog.open(CrudTranslationGroupDialogComponent, {
      data: { groupName: null }
    });

    dialogRef.afterClosed().subscribe((groupName: string) => {
      if (groupName) {
        let translationExist = DataManagerService.findItem(this.translations, groupName, ItemType.Translation);
        if (translationExist) {
          this.snackBarService.open(this.translateService.instant('commons.toast.addGroup.translationExistAndConflitWithAddGroup', { groupName: groupName }), undefined, { panelClass: 'app-notification-warning' });
          return;
        }

        let groupExist = DataManagerService.findItem(this.translationsGroups, groupName, ItemType.Group);
        if (!groupExist) {
          this.dataAccessor.createGroup(groupName, this.languages, this.languagesService.getLevelsConcatened()).subscribe({
            next: () => {
              this.translationsGroups.push(new TranslationsGroup(groupName));
              this.snackBarService.open(this.translateService.instant('commons.toast.addGroup.success', { groupName: groupName }), undefined, { panelClass: 'app-notification-success' });
            },
            error: (response) => {
              this.snackBarService.open(this.translateService.instant('commons.toast.addGroup.fail', { groupName: groupName }), undefined, { panelClass: 'app-notification-error' });
              console.error('Error on add new group', response);
            }
          });
        } else {
          this.snackBarService.open(this.translateService.instant('commons.toast.addGroup.groupExist', { groupName: groupName }), undefined, { panelClass: 'app-notification-warning' });
        }
      }
    });
  }

  openDialogUpdateTranslationsGroup(event: Event, groupName: string) {
    event.stopImmediatePropagation();

    let originalGroupName = groupName;

    let dialogRef = this.dialog.open(CrudTranslationGroupDialogComponent, {
      data: { groupName: groupName }
    });

    dialogRef.afterClosed().subscribe((groupName: string) => {
      if (groupName && originalGroupName !== groupName) {
        this.dataAccessor.updateGroup(groupName, this.languages, this.languagesService.getLevelsConcatened(), originalGroupName).subscribe({
          next: () => {
            this.snackBarService.open(this.translateService.instant('commons.toast.majGroup.success', { groupName: groupName }), undefined, { panelClass: 'app-notification-success' });
            this.translationsGroups.forEach((value, index) => {
              if (value.key === originalGroupName) {
                this.translationsGroups[index].key = groupName;
              }
            });
          },
          error: (error) => {
            this.snackBarService.open(this.translateService.instant('commons.toast.majGroup.fail', { groupName: groupName }), undefined, { panelClass: 'app-notification-error' });
            console.error('Error on rename group', error);
          }
        });
      }
    });
  }

  openDialogDeleteTranslationsGroup(event: Event, groupName: string) {
    event.stopImmediatePropagation();

    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((action: number) => {
      if (action == ConfirmDialogActionEnum.Validate) {
        this.dataAccessor.deleteGroup(groupName, this.languages, this.languagesService.getLevelsConcatened()).subscribe({
          next: () => {
            this.translationsGroups = DataManagerService.removeItem(this.translationsGroups, groupName);
            this.snackBarService.open(this.translateService.instant('commons.toast.deleteGroup.success', { groupName: groupName }), undefined, { panelClass: 'app-notification-success' });
          },
          error: (error) => {
            this.snackBarService.open(this.translateService.instant('commons.toast.deleteGroup.fail', { groupName: groupName }), undefined, { panelClass: 'app-notification-error' });
            console.error('Error on delete group', error);
          }
        });
      }
    });
  }

  openTranslationsGroup(event: Event, translationsGroup: TranslationsGroup) {
    event.stopImmediatePropagation();
    console.log('openTranslationsGroup', translationsGroup);

    this.TranslationsGroupsComponentDidOpenGroupEvent.emit({ groupName: translationsGroup.key });
  }

}
