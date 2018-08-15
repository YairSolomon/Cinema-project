import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceduleHallComponent } from './scedule-hall.component';

describe('SceduleHallComponent', () => {
  let component: SceduleHallComponent;
  let fixture: ComponentFixture<SceduleHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceduleHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceduleHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
