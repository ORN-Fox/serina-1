import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapLanguagesComponent } from './swap-languages.component';

describe('SwapLanguagesComponent', () => {
  let component: SwapLanguagesComponent;
  let fixture: ComponentFixture<SwapLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapLanguagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
