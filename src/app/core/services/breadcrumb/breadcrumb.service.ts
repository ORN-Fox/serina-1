import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BreadcrumbLevel } from '../../models/breadcrumb-level/breadcrumb-level.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  private breadcrumbs: BreadcrumbLevel[];

  constructor()
  {}

  initBreadcrumb(): BreadcrumbLevel[] {
    this.breadcrumbs = [];
    return this.getBreadcrumbs();
  }

  getBreadcrumbs(): BreadcrumbLevel[] {
    return this.breadcrumbs;
  }

  addBreadcrumbLevel(label: string, href: string) {
    let breadcrumbLevel = new BreadcrumbLevel(label, href);
    this.breadcrumbs.push(breadcrumbLevel);
    this.getBreadcrumbs();
  }

  createBreadcrumbs(currentRoute: ActivatedRoute, url: string = ''): BreadcrumbLevel[] {
    const childrens: ActivatedRoute[] = currentRoute.children;

    if (childrens.length > 0) {
      this.initBreadcrumb();
      this.addBreadcrumbLevel(childrens[0].snapshot.data[BreadcrumbService.ROUTE_DATA_BREADCRUMB], url);
    }

    return this.getBreadcrumbs();
  }

}
