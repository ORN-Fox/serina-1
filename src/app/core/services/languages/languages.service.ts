import { Injectable, Optional, SkipSelf } from '@angular/core';
import { log } from 'console';
import { cloneDeep } from 'lodash';

@Injectable()
export class LanguagesService {

  private languages: string[];
  private levels: string[];

  constructor(@Optional() @SkipSelf() sharedService?: LanguagesService) {
    if (sharedService) {
      throw new Error('LanguagesService is already loaded');
    }
    this.clear();
    console.info('LanguageService created');
  }

  // Language related

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

  // Level related

  getLevels(): string[] {
    return cloneDeep(this.levels);
  }

  getLevelsConcatened(): string {
    return this.levels.join('.');
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
    console.log('ici');
    this.levels.push(level);
  }

  removeLastLevel() {
    this.levels.pop();
  }

  // Commons

  clear() {
    this.languages = [];
    this.levels = [];
  }

}
