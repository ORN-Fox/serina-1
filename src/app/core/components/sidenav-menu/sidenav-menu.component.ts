import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MenuToolbarComponent } from '../menu-toolbar/menu-toolbar.component';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent {

  @Input() sideMenu: MatDrawer;

  constructor() {

  }

  closeSideMenu() {
    this.sideMenu.close();
    MenuToolbarComponent.prototype.clearBreadcrumb();
  }

}
