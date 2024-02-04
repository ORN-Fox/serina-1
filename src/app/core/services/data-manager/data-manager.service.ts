import { Injectable } from '@angular/core';

import { ItemType } from '../../enums/itemType.enum';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }

  public findItem(list: any, item: any, type: number): boolean {
    let itemFind = false;
    list.forEach((element: any) => {
      switch (type) {
        case ItemType.Group:
          if (element === item) {
            itemFind = true;
          }
          break
        case ItemType.Translation:
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

  public removeItem(list: any, item: any): any {
    return list.filter((element: any) => element !== item);
  }

}
