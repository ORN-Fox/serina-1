import { Component } from '@angular/core';

import { SettingsService } from './core/services/settings/settings.service';

import { Settings } from './core/models/settings/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  settings: Settings;

  constructor(private settingsService: SettingsService) {
    this.settingsService.initSettings();
    this.settings = this.settingsService.getSettings();
    this.settingsService.setThemeApp();
  }

}
