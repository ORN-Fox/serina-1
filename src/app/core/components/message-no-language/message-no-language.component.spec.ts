import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { MessageNoLanguageComponent } from './message-no-language.component';

describe('MessageNoLanguageComponent', () => {
  let component: MessageNoLanguageComponent;
  let fixture: ComponentFixture<MessageNoLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageNoLanguageComponent],
      imports: [
        TranslateModule.forRoot()
      ]
    });
    fixture = TestBed.createComponent(MessageNoLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
