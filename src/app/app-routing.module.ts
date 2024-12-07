import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LanguagesComponent } from './pages/languages/languages.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TransaltionsLevelComponent } from './pages/translations-level/translations-level.component';

const routes: Routes = [
  {
    path: 'languages',
    component: LanguagesComponent,
    data: { breadcrumb: 'Languages' }
  },
  {
    path: 'language',
    component: TransaltionsLevelComponent,
    data: {
      breadcrumb: 'Language',
      languageCode: ''
    }
  },
  {
    path: 'preview',
    component: PreviewComponent,
    data: { breadcrumb: 'Preview' }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { breadcrumb: 'Settings' }
  },
  {
    path: '',
    redirectTo: '/languages',
    pathMatch: 'full',
    data: { breadcrumb: 'Languages' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
