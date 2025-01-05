import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBackToTopComponent } from './btn-back-to-top.component';

describe('BtnBackToTopComponent', () => {
  let component: BtnBackToTopComponent;
  let fixture: ComponentFixture<BtnBackToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnBackToTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnBackToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
