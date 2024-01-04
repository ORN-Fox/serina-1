import { Component } from '@angular/core';

import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

import { BreadcrumbLevel } from '../../models/breadcrumb-level/breadcrumb-level.model';

enum SearchNavigateSign {
  Previous = '-',
  Next = '+'
}

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss']
})
export class MenuToolbarComponent {

  breadcrumbLevels: BreadcrumbLevel[]; // Store on one same place (Breadcrumb service ?)

  // Search related
  searchIsOpen: boolean;
  searchText: string;
  matchingElements: any[];
  currentMatchingElement: number;

  constructor() {
    this.searchIsOpen = false;
    this.clearSearch();
  }

  // Breadcrumb related
  addBreadcrumbLevel(label: string, href: string) {
    if (!this.breadcrumbLevels) {
      this.breadcrumbLevels = BreadcrumbService.init(label, href);
    } else {
      this.breadcrumbLevels = BreadcrumbService.build(this.breadcrumbLevels, label, href);
    }
  }

  // Search related

  initiateSearch () {
    this.clearSearch();
    this.searchIsOpen = true;
    setTimeout(() => {
      document.getElementById('search-input')?.focus();
    }, 50);
  }

  showPreSearchBar() {
    return this.searchText === null;
  }

  closeSearch() {
    this.clearSearch();
    this.searchIsOpen = false;
    document.getElementById('search-input')?.blur();
  }

  searchKey() {
    if (this.searchText !== '') {
      let inputKeys = document.querySelectorAll('translation md-card .key') as any;
      this.matchingElements = [];
      this.currentMatchingElement = 0;
      for (let iterator = 0; iterator < inputKeys.length; iterator++) {
        if (inputKeys[iterator].value.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) {
          this.matchingElements.push(inputKeys[iterator]);
        }
      }

      if (this.matchingElements.length === 0) {
        this.closeSearch();
      } else {
        this.matchingElements[0]?.focus();
      }
    }
  }

  navigateBetweenMatchingElements(sign: SearchNavigateSign) {
    if (sign === SearchNavigateSign.Previous || sign === SearchNavigateSign.Next) {
      if (sign === SearchNavigateSign.Previous) {
        this.currentMatchingElement--;
        if (this.currentMatchingElement < 0) {
          this.currentMatchingElement = this.matchingElements.length - 1;
        }
      } else if (sign === SearchNavigateSign.Next) {
        this.currentMatchingElement++;
        if (this.currentMatchingElement > this.matchingElements.length - 1) {
          this.currentMatchingElement = 0;
        }
      }
      this.matchingElements[this.currentMatchingElement]?.focus();
    }
  }

  private clearSearch() {
    this.searchText = '';
    this.matchingElements = [];
    this.currentMatchingElement = 0;
  }

  // TODO re-add mousetrap or migrate on another keybing dep
  // Mousetrap.bindGlobal('ctrl+f', (e) => {
  //   if (e.preventDefault) {
  //     e.preventDefault();
  //   }
  //   if (this.breadcrumb[0].href !== '/hub' && this.breadcrumb[0].href !== '/preview' && this.breadcrumb[0].href !== '/settings') {
  //     if (this.searchOpen) {
  //       this.closeSearch();
  //     } else {
  //       this.initiateSearch();
  //     }
  //   }
  // });

  // Mousetrap.bindGlobal('ctrl+up', () => {
  //   if (this.matchingElements) {
  //     this.navigateBetweenMatchingElements(SearchNavigateSign.Previous);
  //   }
  // });

  // Mousetrap.bindGlobal('ctrl+down', () => {
  //   if (this.matchingElements) {
  //     this.navigateBetweenMatchingElements(SearchNavigateSign.Next);
  //   }
  // });

}
