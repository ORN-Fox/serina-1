import { Component, ChangeDetectionStrategy } from '@angular/core';

export enum ConfirmDialogActionEnum {
  Cancel = 0,
  Validate
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ConfirmDialogComponent {

  confirmDialogActionEnum;

  constructor() {
    this.confirmDialogActionEnum = ConfirmDialogActionEnum;
  }

}
