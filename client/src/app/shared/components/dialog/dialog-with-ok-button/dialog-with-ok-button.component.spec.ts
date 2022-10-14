import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWithOkButtonComponent } from './dialog-with-ok-button.component';

describe('DialogWithOkButtonComponent', () => {
  let component: DialogWithOkButtonComponent;
  let fixture: ComponentFixture<DialogWithOkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWithOkButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWithOkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
