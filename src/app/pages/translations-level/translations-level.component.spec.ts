import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaltionsLevelComponent } from './translations-level.component';

describe('TransaltionsLevelComponent', () => {
  let component: TransaltionsLevelComponent;
  let fixture: ComponentFixture<TransaltionsLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaltionsLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaltionsLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
