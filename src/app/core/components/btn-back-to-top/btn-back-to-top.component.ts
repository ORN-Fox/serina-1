import { Component } from '@angular/core';

@Component({
    selector: 'app-btn-back-to-top',
    templateUrl: './btn-back-to-top.component.html',
    styleUrl: './btn-back-to-top.component.scss',
    standalone: false
})
export class BtnBackToTopComponent {

  backToTop() {
    document.getElementsByTagName('mat-drawer-content')[0].scrollTo(0, 0);
  }

}
