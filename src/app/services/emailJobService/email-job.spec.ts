import { TestBed } from '@angular/core/testing';
import { EmailJob } from '../../models/EmailJob';
import { EmailJobService } from './email-job';


describe('EmailJob', () => {
  let service: EmailJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
