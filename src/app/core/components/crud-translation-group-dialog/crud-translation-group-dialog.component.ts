import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isNull } from 'lodash';

export interface CrudTranslationGroupDialogData {
  groupName: string;
}

@Component({
    selector: 'app-crud-translation-group-dialog',
    templateUrl: './crud-translation-group-dialog.component.html',
    styleUrls: ['./crud-translation-group-dialog.component.scss'],
    standalone: false
})
export class CrudTranslationGroupDialogComponent implements OnInit {

  titleKey: string;
  placeholderKey: string;
  confirmButtonKey: string;

  constructor(
    public dialogRef: MatDialogRef<CrudTranslationGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrudTranslationGroupDialogData
  ) { }

  ngOnInit() {
    let isAddMode = isNull(this.data.groupName);

    this.titleKey = `commons.dialog.${isAddMode? "addGroup" : "majGroup"}.title`;
    this.placeholderKey = `commons.dialog.${isAddMode? "addGroup" : "majGroup"}.placeholder`;
    this.confirmButtonKey = `commons.actions.${isAddMode? "add" : "rename"}`;

    this.formatGroupName(this.data.groupName);
  }

  formatGroupName(groupName: string) {
    this.data.groupName = groupName?.replace(' ', '_');
  }

  cancel() {
    this.dialogRef.close();
  }

}
