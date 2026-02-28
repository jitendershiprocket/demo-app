import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUserId returns id when user found', () => {
    expect(service.getUserId(1)).toBe(1);
    expect(service.getUserId(2)).toBe(2);
  });

  it('getUserId returns null when user not found (no crash)', () => {
    expect(service.getUserId(999)).toBeNull();
  });
});
