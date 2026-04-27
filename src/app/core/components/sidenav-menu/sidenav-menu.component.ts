import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav-menu',
    templateUrl: './sidenav-menu.component.html',
    styleUrls: ['./sidenav-menu.component.scss'],
    standalone: false
})
export class SidenavMenuComponent {

  @Input() sideMenu: MatDrawer;

  constructor() {

  }

  closeSideMenu() {
    this.sideMenu.close();
  }

}
