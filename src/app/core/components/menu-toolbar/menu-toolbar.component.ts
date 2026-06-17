import { Component, Input } from '@angular/core';
import { filter } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import Mousetrap from 'mousetrap';
// Import is need for append bingGlobal interface on Mousetrap class
import MousetrapBindGlobal from 'mousetrap/plugins/global-bind/mousetrap-global-bind';

import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { LanguagesService } from '../../services/languages/languages.service';

import { BreadcrumbLevel } from '../../models/breadcrumb-level/breadcrumb-level.model';

enum SearchNavigateSign {
  Previous = '-',
  Next = '+'
}

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss'],
  standalone: false
})
export class MenuToolbarComponent {

  @Input() sideMenu: MatDrawer;

  breadcrumbs: BreadcrumbLevel[];

  // Search related
  searchIsOpen: boolean;
  searchText: string;
  matchingElements: any[];
  currentMatchingElement: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private languagesService: LanguagesService,
    private router: Router
  ) {
    this.searchIsOpen = false;
    this.clearSearch();

    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((route: any) => {
        this.breadcrumbs = this.breadcrumbService.createBreadcrumbs(this.activatedRoute.root, route.url);
      });
  }

  toggleSideMenu() {
    this.sideMenu.toggle();
  }

  goToLevel(level: BreadcrumbLevel) {
    this.languagesService.removeLevelAfterTargetLevel(level);
    this.breadcrumbService.removeBreadcrumbLevelAfterTargetBreadcrumbLevel(level);
    // navigation is start with breadcrumb broadcast event in translations-level page
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

  initShortcuts() {
    Mousetrap.bindGlobal('ctrl+f', (e: Event) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (this.breadcrumbs[0].href === BreadcrumbService.ROOT_BREADCRUMB_LEVEL) {
        if (this.searchIsOpen) {
          this.closeSearch();
        } else {
          this.initiateSearch();
        }
      }
    });

    Mousetrap.bindGlobal('ctrl+up', () => {
      if (this.matchingElements) {
        this.navigateBetweenMatchingElements(SearchNavigateSign.Previous);
      }
    });

    Mousetrap.bindGlobal('ctrl+down', () => {
      if (this.matchingElements) {
        this.navigateBetweenMatchingElements(SearchNavigateSign.Next);
      }
    });
  }

}
