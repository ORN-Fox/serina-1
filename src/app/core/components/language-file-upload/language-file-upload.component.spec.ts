import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LanguageFileUploadComponent } from './language-file-upload.component';

describe('LanguageFileUploadComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let component: LanguageFileUploadComponent;
  let fixture: ComponentFixture<LanguageFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageFileUploadComponent],
      imports: [
        BrowserDynamicTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(LanguageFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
