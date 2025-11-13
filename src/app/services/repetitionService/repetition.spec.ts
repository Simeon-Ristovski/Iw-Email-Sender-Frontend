import { TestBed } from '@angular/core/testing';
import { RepetitionService } from './repetition';


describe('Repetition', () => {
  let service: RepetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
