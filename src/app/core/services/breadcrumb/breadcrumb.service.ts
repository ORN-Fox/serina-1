import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { BreadcrumbLevel } from '../../models/breadcrumb-level/breadcrumb-level.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbs: BreadcrumbLevel[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.initBreadcrumb();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      }
    });
  }

  getBreadcrumb(): BreadcrumbLevel[] {
    return this.breadcrumbs;
  }

  initBreadcrumb() {
    this.breadcrumbs = [];
  }

  addBreadcrumbLevel(label: string, href: string) {
    let breadcrumb = new BreadcrumbLevel(label, href);
    this.breadcrumbs.push(breadcrumb);
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbLevel[] = []): BreadcrumbLevel[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      this.initBreadcrumb();
      this.addBreadcrumbLevel(route.snapshot.data['breadcrumb'], url);
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      this.addBreadcrumbLevel(child.snapshot.data['breadcrumb'], url);
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  // build(currentBreadcrumb: BreadcrumbLevel[], lang: string, levels: string): BreadcrumbLevel[] | null {
  //   let breadcrumb = currentBreadcrumb;
  //   let currentLevel = 1;
  //
  //   let splitedLevels = levels ? levels.split('/') : [];
  //   splitedLevels.forEach((level) => {
  //     let hrefComputed = '';
  //     for (let iterator = 0; iterator < currentLevel; iterator++) {
  //       hrefComputed += `/${levels[iterator]}`;
  //     }
  //
  //     let computedHref = `/language/${lang}${hrefComputed}`;
  //     breadcrumb.push(new BreadcrumbLevel(level, computedHref));
  //     currentLevel++;
  //   });
  //   return this.getBreadcrumb();
  // }

}
