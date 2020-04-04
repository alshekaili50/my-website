import { TestBed } from '@angular/core/testing';

import { ConnectToDBService } from './connect-to-db.service';

describe('ConnectToDBService', () => {
  let service: ConnectToDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectToDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
