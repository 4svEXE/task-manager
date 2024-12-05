import { TestBed } from '@angular/core/testing';

import { GitHubApiService } from './githubApi.service';

describe('GithubService', () => {
  let service: GitHubApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitHubApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
