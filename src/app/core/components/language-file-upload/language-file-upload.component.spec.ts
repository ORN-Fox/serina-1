import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageFileUploadComponent } from './language-file-upload.component';

describe('LanguageFileUploadComponent', () => {
  let component: LanguageFileUploadComponent;
  let fixture: ComponentFixture<LanguageFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageFileUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
