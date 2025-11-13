import { TestBed } from '@angular/core/testing';
import { ExceptionEntityService } from './exception-entity';

describe('ExceptionEntity', () => {
  let service: ExceptionEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExceptionEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
