import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  itemExist(key: string) {
    return localStorage.getItem(key) !== null;
  }

  getItem(key: string): any {
    return JSON.parse(this.getItem(key));
  }

  setItem(key: string, data: object) {
    localStorage.setItem(key, JSON.stringify(data));
  }

}
