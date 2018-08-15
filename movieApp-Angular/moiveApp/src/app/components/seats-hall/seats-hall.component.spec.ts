import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsHallComponent } from './seats-hall.component';

describe('SeatsHallComponent', () => {
  let component: SeatsHallComponent;
  let fixture: ComponentFixture<SeatsHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
