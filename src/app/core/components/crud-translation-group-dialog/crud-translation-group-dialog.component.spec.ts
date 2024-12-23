import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { CrudTranslationGroupDialogComponent } from './crud-translation-group-dialog.component';

describe('CrudTranslationGroupDialogComponent', () => {
  let component: CrudTranslationGroupDialogComponent;
  let fixture: ComponentFixture<CrudTranslationGroupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudTranslationGroupDialogComponent],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    });
    fixture = TestBed.createComponent(CrudTranslationGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
