import { TestBed, inject } from '@angular/core/testing';

import { SkillpathApiService } from './skillpath-api.service';

describe('SkillpathApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillpathApiService]
    });
  });

  it('should ...', inject([SkillpathApiService], (service: SkillpathApiService) => {
    expect(service).toBeTruthy();
  }));
});
