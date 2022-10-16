import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForNewEventComponent } from './dialog-for-new-event.component';

describe('DialogForNewEventComponent', () => {
  let component: DialogForNewEventComponent;
  let fixture: ComponentFixture<DialogForNewEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogForNewEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogForNewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
