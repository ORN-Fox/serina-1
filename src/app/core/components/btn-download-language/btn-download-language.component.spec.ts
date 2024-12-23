import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { BtnDownloadLanguageComponent } from './btn-download-language.component';

describe('BtnDownloadLanguageComponent', () => {
  let component: BtnDownloadLanguageComponent;
  let fixture: ComponentFixture<BtnDownloadLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnDownloadLanguageComponent],
      imports: [
        TranslateModule.forRoot()
      ]
    });
    fixture = TestBed.createComponent(BtnDownloadLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
