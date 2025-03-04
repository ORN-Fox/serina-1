import { TestBed } from '@angular/core/testing';

import { DataManagerService } from './data-manager.service';
import { ItemType } from '../../enums/itemType.enum';

describe('DataManagerService', () => {
  let service: DataManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findItem()', function () {

    describe('group', function () {
      it('"test" in list to contain group find', function () {
        let list = ['alpha', 'beta', 'test', 'omega']
        let result = DataManagerService.findItem(list, 'test', ItemType.Group)

        expect(result).toEqual(true)
        expect(result).not.toEqual(false)
      })

      it('"test" in list to not contain group find', function () {
        let list = ['alpha', 'beta', 'gamma', 'omega']
        let result = DataManagerService.findItem(list, 'test', ItemType.Group)

        expect(result).toEqual(false)
        expect(result).not.toEqual(true)
      })

      it('"test" in list to contain group find and type is invalid', function () {
        let list = ['alpha', 'beta', 'test', 'gamma', 'omega']
        let result = DataManagerService.findItem(list, 'test', -1);

        expect(result).toEqual(true)
        expect(result).not.toEqual(false)
      })
    })

    describe('translation', function () {
      it('"welcomme" in list to contain translation find and save', function () {
        let list = [{ key: 'bye', value: 'Good bye', save: true}, { key: 'welcome', value: 'Welcome', save: true }]
        let result = DataManagerService.findItem(list, 'welcome', ItemType.Translation)

        expect(result).toEqual(true)
        expect(result).not.toEqual(false)
      })

      it('"welcomme" in list to contain translation find and not save', function () {
        let list = [{ key: 'bye', value: 'Good bye', save: true}, { key: 'welcome', value: 'Welcome', save: false }]
        let result = DataManagerService.findItem(list, 'welcome', ItemType.Translation)

        expect(result).toEqual(false)
        expect(result).not.toEqual(true)
      })

      it('"welcome" in list to not contain translation find', function () {
        let list = [{ key: 'bye', value: 'Good bye', save: true}, { key: 'hello', value: 'Hello', save: true }]
        let result = DataManagerService.findItem(list, 'welcome', ItemType.Translation)

        expect(result).toEqual(false)
        expect(result).not.toEqual(true)
      })

      it('"welcome" in list to contain translation find and type is invalid', function () {
        let list = [{ key: 'bye', value: 'Good bye', save: true}, { key: 'hello', value: 'Hello', save: true }]
        let result = DataManagerService.findItem(list, 'welcome', -1)

        expect(result).toEqual(false)
        expect(result).not.toEqual(true)
      })
    })
  })

  describe('removeItem()', function () {
    let list = ['fr', 'en', 'es', 'it', 'ca']

    it('should remove item = "it"', function () {
      let listResult = DataManagerService.removeItem(list, 'it')

      expect(listResult).toEqual(['fr', 'en', 'es', 'ca'])
      expect(listResult).not.toEqual(list)
    })

    it('should remove item = null', function () {
      let listResult = DataManagerService.removeItem(list, null)

      expect(listResult).toEqual(list)
      expect(listResult).not.toEqual(['fr', 'en', 'es'])
    })
  });

});
