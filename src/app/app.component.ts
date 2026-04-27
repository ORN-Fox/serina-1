import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { SettingsService } from './core/services/settings/settings.service';

import { Settings } from './core/models/settings/settings.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  @ViewChild('drawer', { static: true }) public sideMenu: MatDrawer;
  
  settings: Settings;

  constructor(private settingsService: SettingsService) {
    this.settingsService.initSettings();
    this.settings = this.settingsService.getSettings();
    this.settingsService.setThemeApp();
  }
  
}
