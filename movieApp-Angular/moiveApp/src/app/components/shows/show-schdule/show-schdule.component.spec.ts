import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSchduleComponent } from './show-schdule.component';

describe('ShowSchduleComponent', () => {
  let component: ShowSchduleComponent;
  let fixture: ComponentFixture<ShowSchduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSchduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSchduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
