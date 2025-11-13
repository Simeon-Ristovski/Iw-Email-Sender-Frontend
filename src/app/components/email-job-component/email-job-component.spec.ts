import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailJobComponent } from './email-job-component';

describe('EmailJobComponent', () => {
  let component: EmailJobComponent;
  let fixture: ComponentFixture<EmailJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
