import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  isItemExist(key: string): boolean {
    return this.getItem(key) !== null;
  }

  getItem(key: string): any | null {
    let result = localStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }

  setItem(key: string, data: object) {
    localStorage.setItem(key, JSON.stringify(data));
  }

}
