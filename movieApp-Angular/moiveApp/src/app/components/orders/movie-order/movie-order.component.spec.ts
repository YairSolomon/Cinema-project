import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOrderComponent } from './movie-order.component';

describe('MovieOrderComponent', () => {
  let component: MovieOrderComponent;
  let fixture: ComponentFixture<MovieOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
