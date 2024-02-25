import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Commons Components
import { ConfirmDialogComponent } from './core/components/confirm-dialog/confirm-dialog.component';
import { BtnDownloadLanguageComponent } from './core/components/btn-download-language/btn-download-language.component';
import { MenuToolbarComponent } from './core/components/menu-toolbar/menu-toolbar.component';
import { MessageNoLanguageComponent } from './core/components/message-no-language/message-no-language.component';

// Pages
import { LanguagesComponent } from './pages/languages/languages.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SidenavMenuComponent } from './core/components/sidenav-menu/sidenav-menu.component';
import { TransaltionsLevelComponent } from './pages/translations-level/translations-level.component';
import { TranslationComponent } from './core/components/translation/translation.component';
import { TranslationsComponent } from './core/components/translations/translations.component';
import { TranslationsGroupsComponent } from './core/components/translations-groups/translations-groups.component';
import { CrudTranslationGroupDialogComponent } from './core/components/crud-translation-group-dialog/crud-translation-group-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,

    // Commons Components
    ConfirmDialogComponent,
    BtnDownloadLanguageComponent,
    MenuToolbarComponent,
    MessageNoLanguageComponent,

    // Pages
    LanguagesComponent,
    PreviewComponent,
    SettingsComponent,
    SidenavMenuComponent,
    TransaltionsLevelComponent,
    TranslationComponent,
    TranslationsComponent,
    TranslationsGroupsComponent,
    CrudTranslationGroupDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    ScrollingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
