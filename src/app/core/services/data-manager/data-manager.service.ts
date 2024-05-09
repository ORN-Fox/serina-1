import { Injectable } from '@angular/core';

import { ItemType } from '../../enums/itemType.enum';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }

  public static findItem(list: any, item: any, type: number): boolean {
    let itemFind = false;
    list.forEach((element: any) => {
      switch (type) {
        case ItemType.Group:
          if (element.key === item) {
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

  public static removeItem(list: any, item: any): any {
    return list.filter((element: any) => element !== item);
  }

  private static getItemRecursive(list: any, levels: string[], levelIndex: number): any {
    for (const [key, value] of Object.entries(list)) {
      if (isObject(value)) {
        if (levels[levelIndex] == key) {
          if ((levels.length - 1) == levelIndex) {
            return value;
          } else {
            levelIndex++;
            return DataManagerService.getItemRecursive(value, levels, levelIndex);
          }
        }
      }
    }
  }

}
