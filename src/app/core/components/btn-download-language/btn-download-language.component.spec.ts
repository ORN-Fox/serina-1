import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDownloadLanguageComponent } from './btn-download-language.component';

describe('BtnDownloadLanguageComponent', () => {
  let component: BtnDownloadLanguageComponent;
  let fixture: ComponentFixture<BtnDownloadLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnDownloadLanguageComponent]
    });
    fixture = TestBed.createComponent(BtnDownloadLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
