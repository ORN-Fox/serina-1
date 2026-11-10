import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { SettingAppLanguage } from './core/models/settings/settings.model';

import { LanguagesService } from './core/services/languages/languages.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        AppComponent
    ],
    imports: [MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule
    ],
    providers: [
        LanguagesService,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix:"./assets/i18n/", 
                suffix:".json"
            }),
            fallbackLang: SettingAppLanguage.EnUS,
        }),
    ]
}).compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
