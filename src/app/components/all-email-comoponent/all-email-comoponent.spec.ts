import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmailComoponent } from './all-email-comoponent';

describe('AllEmailComoponent', () => {
  let component: AllEmailComoponent;
  let fixture: ComponentFixture<AllEmailComoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEmailComoponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEmailComoponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
