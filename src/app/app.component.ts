import { Component, ViewChild, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { SettingsService } from './core/services/settings/settings.service';

import { Settings } from './core/models/settings/settings.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {

  readonly settingsService = Inject(SettingsService);

  @ViewChild('drawer', { static: true }) public sideMenu: MatSidenav;
  
  settings: Settings;

  constructor() {
    this.settingsService.initSettings();
    this.settings = this.settingsService.getSettings();
    this.settingsService.setThemeApp();
  }
  
}
