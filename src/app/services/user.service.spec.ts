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

  it('getUser returns user when found', () => {
    const user = service.getUser(1);
    expect(user).toBeTruthy();
    expect(user?.id).toBe(1);
    expect(user?.name).toBe('Alice');
  });

  it('getUser returns null when not found', () => {
    const user = service.getUser(999);
    expect(user).toBeNull();
  });

  it('getUserId returns id when user found', () => {
    const id = service.getUserId(1);
    expect(id).toBe(1);
  });

  it('getUserId returns null when user not found (no crash)', () => {
    const id = service.getUserId(999);
    expect(id).toBeNull();
  });
});
