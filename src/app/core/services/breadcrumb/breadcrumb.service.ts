import { Injectable } from '@angular/core';

import { BreadcrumbLevel } from '../../models/breadcrumb-level/breadcrumb-level.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  init(label: string, href: string) {
    return [new BreadcrumbLevel(label, href)];
  }

  build(currentBreadcrumb: BreadcrumbLevel[], lang: string, levels: string) {
    let breadcrumb = currentBreadcrumb;
    let currentLevel = 1;

    let splitedLevels = levels ? levels.split('/') : [];
    splitedLevels.forEach((level) => {
      let hrefComputed = '';
      for (let iterator = 0; iterator < currentLevel; iterator++) {
        hrefComputed += '/' + levels[iterator];
      }

      let computedHref = '/language/' + lang + hrefComputed;
      breadcrumb.push(new BreadcrumbLevel(level, computedHref));
      currentLevel++;
    })
    return breadcrumb;
  }
  
}
