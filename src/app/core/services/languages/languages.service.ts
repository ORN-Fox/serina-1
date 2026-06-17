import { Injectable, Optional, SkipSelf } from '@angular/core';
import { cloneDeep } from 'lodash';

import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';

import { BreadcrumbLevel } from '../../models/breadcrumb-level/breadcrumb-level.model';

@Injectable()
export class LanguagesService {

  private languages: string[];
  private levels: string[];

  constructor(@Optional() @SkipSelf() sharedService?: LanguagesService) {
    if (sharedService) {
      throw new Error('LanguagesService is already loaded');
    }
    this.clear();
  }

  // #region Language

  getLanguages(): string[] {
    return cloneDeep(this.languages);
  }

  addLanguages(codes: string[]) {
    if (this.languages.length == 0) {
      this.languages = codes;
    }
  }

  addLanguage(code: string) {
    if (code && this.languages.indexOf(code) == -1) {
      this.languages.push(code);
    }
  }

  // #region Level

  getLevels(): string[] {
    return cloneDeep(this.levels);
  }

  getLevelsConcatened(): string | null {
    if (this.levels.length > 0) {
      return this.levels.join('.');
    }
    return null;
  }

  getLevelsToHref(): string {
    let href = BreadcrumbService.ROOT_BREADCRUMB_LEVEL;

    if (this.levels.length > 1) {
      const subLevels = cloneDeep(this.levels);
      subLevels.shift();
      href += `/${subLevels.join('/')}`;
    }

    return href;
  }

  addLevels(levels: string[]) {
    if (this.levels.length == 0) {
      this.levels = levels;
    }
  }

  getLastLevel(): string {
    return this.levels[this.levels.length - 1];
  }

  addLevel(level: string) {
    this.levels.push(level);
  }

  removeLastLevel() {
    this.levels.pop();
  }

  removeLevelAfterTargetLevel(breadcrumbLevel: BreadcrumbLevel) {
    if (!breadcrumbLevel) {
      return;
    }

    // If a breadcrumb-like object with a href was passed, derive levels from the href
    if (breadcrumbLevel.href && typeof breadcrumbLevel.href === 'string') {
      const href = breadcrumbLevel.href.startsWith('/') ? breadcrumbLevel.href : `/${breadcrumbLevel.href}`;
      // Split and remove empty segments: e.g. '/language/group/sub' -> ['language','group','sub']
      const parts = href.split('/').filter(part => part.length > 0);

      if (parts.length === 0) {
        this.levels = [];
        return;
      }

      // First element is the root (expected 'language'), keep it as '/language'
      const pageLevel = parts[0];
      const newLevels: string[] = [];
      newLevels.push(`/${pageLevel}`);

      // Append any sub-levels after the root
      if (parts.length > 1) {
        newLevels.push(...parts.slice(1));
      }

      this.levels = newLevels;
      return;
    }

    // If a simple string level was passed, trim the levels array to that index
    const levelIndex = this.levels.indexOf(breadcrumbLevel as any);
    if (levelIndex !== -1) {
      this.levels = this.levels.slice(0, levelIndex + 1);
    }
  }

  clear() {
    this.languages = [];
    this.levels = [];
  }

}
