import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { LanguagesService } from 'src/app/core/services/languages/languages.service';

import { TransaltionsLevelComponent } from './translations-level.component';

describe('TransaltionsLevelComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let component: TransaltionsLevelComponent;
  let fixture: ComponentFixture<TransaltionsLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaltionsLevelComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        LanguagesService,
        MatSnackBar
      ]
    })
    .compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(TransaltionsLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
