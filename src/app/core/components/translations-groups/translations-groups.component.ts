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
    // TODO use translations for dialog
    // let options = {
    //   title: this.translateService.instant('commons.dialog.addGroup.title'),
    //   placeholder: this.translateService.instant('commons.dialog.addGroup.placeholder'),
    //   ariaLabel: this.translateService.instant('commons.dialog.addGroup.title'),
    //   targetEvent: ev,
    //   ok: this.translateService.instant('commons.actions.add'),
    //   cancel: this.translateService.instant('commons.actions.cancel')
    // }

    // TODO get group name from dialog value
    let groupName = "";

    // Dialog.showPrompt(options).then((groupName: string) => {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((action: number) => {
      if (action == ConfirmDialogActionEnum.Validate) {
        if (!this.dataManager.findItem(this.translationsGroups, groupName, ItemType.Group)) {
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
    // TODO use translations for dialog
    // let options = {
    //   title: this.translateService.instant('commons.dialog.majGroup.title'),
    //   placeholder: this.translateService.instant('commons.dialog.majGroup.placeholder'),
    //   ariaLabel: this.translateService.instant('commons.dialog.majGroup.title'),
    //   initialValue: groupName,
    //   targetEvent: ev,
    //   ok: this.translateService.instant('commons.actions.validate'),
    //   cancel: this.translateService.instant('commons.actions.cancel')
    // }

    // Dialog.showPrompt(options).then((groupName: string) => {

    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((action: number) => {
      if (action == ConfirmDialogActionEnum.Validate) {
        if (originalGroupName !== groupName) {
          this.dataAccessor.updateGroup(groupName, this.languages, this.levels, originalGroupName).subscribe({
            next: () => {
              this.snackBarService.open(this.translateService.instant('commons.toast.majGroup.success', { groupName: groupName }), undefined, { panelClass: 'app-notification-success' });
              // Toast.showCustomToast('check', this.translateService.instant('commons.toast.majGroup.success', { 'groupName': groupName }), 'good')
              this.translationsGroups.forEach((value, index) => {
                if (value.key === originalGroupName) {
                  this.translationsGroups[index].key = groupName;
                }
              });
            },
            error: (error) => {
              this.snackBarService.open(this.translateService.instant('commons.toast.majGroup.fail', { groupName: groupName }), undefined, { panelClass: 'app-notification-error' });
              // Toast.showCustomToast('warning', this.translateService.instant('commons.toast.majGroup.fail', { 'groupName': groupName }), 'fail');
              console.error('Error on rename group', error);
            }
          });
        }
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
            // Toast.showCustomToast('check', this.translateService.instant('commons.toast.deleteGroup.success', { 'groupName': groupName }), 'good');
          },
          error: (error) => {
            this.snackBarService.open(this.translateService.instant('commons.toast.deleteGroup.succesfails', { groupName: groupName }), undefined, { panelClass: 'app-notification-error' });
            // Toast.showCustomToast('warning', this.translateService.instant('commons.toast.deleteGroup.fail', { 'groupName': groupName }), 'fail');
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
