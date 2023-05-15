import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LanguagesComponent } from './pages/languages/languages.component';
import { LevelComponent } from './pages/level/level.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PreviewComponent } from './pages/preview/preview.component';

const routes: Routes = [
  { path: '/languages', component: LanguagesComponent },
  { path: '/level', component: LevelComponent },
  { path: '/preview', component: PreviewComponent },
  { path: '/settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
