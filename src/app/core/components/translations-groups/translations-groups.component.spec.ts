import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsGroupsComponent } from './translations-groups.component';

describe('TranslationsGroupsComponent', () => {
  let component: TranslationsGroupsComponent;
  let fixture: ComponentFixture<TranslationsGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationsGroupsComponent]
    });
    fixture = TestBed.createComponent(TranslationsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
