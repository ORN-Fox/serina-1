import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { BreadcrumbLevel } from '../../models/breadcrumb-level/breadcrumb-level.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  static readonly ROOT_BREADCRUMB_LEVEL = '/language';

  private breadcrumbsSubject = new BehaviorSubject<any>(null);
  public breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  get breadcrumbsValue(): BreadcrumbLevel[] {
    return this.breadcrumbsSubject.value;
  }

  constructor() {
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    this.breadcrumbsSubject.next([]);
  }

  getBreadcrumbs(): BreadcrumbLevel[] {
    return this.breadcrumbsValue ?? [];
  }

  addBreadcrumbLevel(label: string, href: string) {
    let breadcrumbs = this.getBreadcrumbs();
    breadcrumbs.push(new BreadcrumbLevel(label, href));
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  removeBreadcrumbLevelAfterTargetBreadcrumbLevel(level: BreadcrumbLevel) {
    if (!level || !level.href) {
      return;
    }

    let breadcrumbs = this.getBreadcrumbs();
    const targetIndex = breadcrumbs.findIndex(breadcrumbLevel => breadcrumbLevel.href === level.href);
    if (targetIndex === -1) {
      return;
    }

    const newBreadcrumbs = breadcrumbs.slice(0, targetIndex + 1);
    this.breadcrumbsSubject.next(newBreadcrumbs);
  }

  createBreadcrumbs(currentRoute: ActivatedRoute, url: string = ''): BreadcrumbLevel[] {
    const childrens: ActivatedRoute[] = currentRoute.children;

    if (url !== BreadcrumbService.ROOT_BREADCRUMB_LEVEL && childrens.length > 0) {
      this.initBreadcrumb();
      this.addBreadcrumbLevel(childrens[0].snapshot.data[BreadcrumbService.ROUTE_DATA_BREADCRUMB], url);
    }

    return this.getBreadcrumbs();
  }

  removeLastBreadcrumbLevel() {
    let breadcrumbs = this.getBreadcrumbs();
    breadcrumbs.pop();
    this.breadcrumbsSubject.next(breadcrumbs);
  }

}
