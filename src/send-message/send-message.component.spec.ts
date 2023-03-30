import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageComponent } from './send-message.component';

describe('MessageComponent', () => {
  let component: SendMessageComponent;
  let fixture: ComponentFixture<SendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
