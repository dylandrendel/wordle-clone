import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessRowComponent } from './guess-row.component';

describe('GuessRowComponent', () => {
  let component: GuessRowComponent;
  let fixture: ComponentFixture<GuessRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
