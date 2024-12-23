import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { Translation } from '../../models/translation/translation.model';

import { TranslationComponent } from './translation.component';

describe('TranslationComponent', () => {
  let component: TranslationComponent;
  let fixture: ComponentFixture<TranslationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationComponent],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    });

    fixture = TestBed.createComponent(TranslationComponent);
    component = fixture.componentInstance;
    component.languages = ['en-US', 'fr-FR'];
    component.translation = new Translation('hello', ['Hello', 'Bonjour'], true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
