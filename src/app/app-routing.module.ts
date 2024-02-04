import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LanguagesComponent } from './pages/languages/languages.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TransaltionsLevelComponent } from './pages/translations-level/translations-level.component';

const routes: Routes = [
  { path: 'languages', component: LanguagesComponent },
  { path: 'language/:code', component: TransaltionsLevelComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '',   redirectTo: '/languages', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
