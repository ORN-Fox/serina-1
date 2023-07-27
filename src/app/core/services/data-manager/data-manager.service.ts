import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }

  public find(list: any, item: any, type: string): boolean {
    let itemFind = false;
    list.forEach((element: any) => {
      switch (type) {
        case 'group':
          if (element === item) {
            itemFind = true;
          }
          break
        case 'trad':
          if (element.key === item && element.save) {
            itemFind = true;
          }
          break
        default:
          if (element === item) {
            itemFind = true;
          }
      }
    })
    return itemFind;
  }

  public remove(list: any, item: any) {
    return list.filter((element: any) => element !== item);
  }

}
