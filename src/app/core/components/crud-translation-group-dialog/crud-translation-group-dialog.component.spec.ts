import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTranslationGroupDialogComponent } from './crud-translation-group-dialog.component';

describe('CrudTranslationGroupDialogComponent', () => {
  let component: CrudTranslationGroupDialogComponent;
  let fixture: ComponentFixture<CrudTranslationGroupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudTranslationGroupDialogComponent]
    });
    fixture = TestBed.createComponent(CrudTranslationGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
