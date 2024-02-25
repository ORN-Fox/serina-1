import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DataAccessorService } from '../../services/data-accessor/data-accessor.service';
import { DataManagerService } from '../../services/data-manager/data-manager.service';

import { ItemType } from '../../enums/itemType.enum';

import { TranslationsGroup } from '../../models/translations-group/translations-group.model';

import { ConfirmDialogActionEnum, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CrudTranslationGroupDialogComponent } from '../crud-translation-group-dialog/crud-translation-group-dialog.component';
import { MenuToolbarComponent } from '../menu-toolbar/menu-toolbar.component';

@Component({
  selector: 'app-translations-groups',
  templateUrl: './translations-groups.component.html',
  styleUrls: ['./translations-groups.component.scss']
})
export class TranslationsGroupsComponent {

  @Input() languages: string[];
  @Input() levels: string;
  @Input() translationsGroups: TranslationsGroup[];

  constructor(
    public dialog: MatDialog,
    private dataAccessor: DataAccessorService,
    private dataManager: DataManagerService,
    private router: Router,
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
        let groupExist = this.dataManager.findItem(this.translationsGroups, groupName, ItemType.Group);
        if (!groupExist) {
          this.dataAccessor.createGroup(groupName, this.languages, this.levels).subscribe({
            next: () => {
              this.translationsGroups.push(new TranslationsGroup(groupName));
              this.snackBarService.open(this.translateService.instant('commons.toast.addGroup.success', { groupName: groupName }), undefined, { panelClass: 'app-notification-success' });
              // Toast.showCustomToast('check', this.translateService.instant('commons.toast.addGroup.success', { 'groupName': groupName }), 'good');
            },
            error: (response) => {
              this.snackBarService.open(this.translateService.instant('commons.toast.addGroup.fail', { groupName: groupName }), undefined, { panelClass: 'app-notification-error' });
              // Toast.showCustomToast('warning', this.translateService.instant('commons.toast.addGroup.fail', { 'groupName': groupName }), 'fail');
              console.error('Error on add new group', response);
            }
          });
        } else {
          this.snackBarService.open(this.translateService.instant('commons.toast.addGroup.groupExist', { groupName: groupName }), undefined, { panelClass: 'app-notification-warning' });
          // Toast.showCustomToast('info_outline', this.translateService.instant('commons.toast.addGroup.groupExist', { 'groupName': groupName }), 'medium');
        }
      }
    });
  }

  opendDialogUpdateTranslationsGroup(groupName: string) {
    let originalGroupName = groupName;

    let dialogRef = this.dialog.open(CrudTranslationGroupDialogComponent, {
      data: { groupName: groupName }
    });

    dialogRef.afterClosed().subscribe((groupName: string) => {
      if (originalGroupName !== groupName) {
        this.dataAccessor.updateGroup(groupName, this.languages, this.levels, originalGroupName).subscribe({
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

  openDialogDeleteTranslationsGroup(groupName: string) {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((action: number) => {
      if (action == ConfirmDialogActionEnum.Validate) {
        this.dataAccessor.deleteGroup(groupName, this.languages, this.levels).subscribe({
          next: () => {
            this.translationsGroups = this.dataManager.removeItem(this.translationsGroups, groupName);
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

  openTranslationsGroup(translationsGroup: TranslationsGroup) {
    let currentUrl = this.router.url;
    MenuToolbarComponent.prototype.closeSearch();
    this.router.navigate([`${currentUrl}/${translationsGroup.key}`]);
  }

}
