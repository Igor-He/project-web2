import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCurrentOrderComponent } from './new-current-order.component';

describe('NewCurrentOrderComponent', () => {
  let component: NewCurrentOrderComponent;
  let fixture: ComponentFixture<NewCurrentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCurrentOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCurrentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
