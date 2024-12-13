import { TestBed } from '@angular/core/testing';

import { ScheduledTasksService } from './scheduled-tasks.service';

describe('ScheduledTasksService', () => {
  let service: ScheduledTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
