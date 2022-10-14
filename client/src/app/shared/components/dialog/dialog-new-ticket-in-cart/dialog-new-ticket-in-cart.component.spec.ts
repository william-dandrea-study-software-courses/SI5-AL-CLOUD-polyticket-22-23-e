import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewTicketInCartComponent } from './dialog-new-ticket-in-cart.component';

describe('DialogNewTicketInCartComponent', () => {
  let component: DialogNewTicketInCartComponent;
  let fixture: ComponentFixture<DialogNewTicketInCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewTicketInCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewTicketInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
