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

  it('getUserEmail returns email when user found', () => {
    const email = service.getUserEmail(1);
    expect(email).toBe('alice@example.com');
  });

  it('getUserEmail returns null when user not found (no crash)', () => {
    const email = service.getUserEmail(999);
    expect(email).toBeNull();
  });

  it('getNthUserName returns name when index valid', () => {
    expect(service.getNthUserName(0)).toBe('Alice');
    expect(service.getNthUserName(1)).toBe('Bob');
  });

  it('getDomainFromEmail returns domain when user found', () => {
    expect(service.getDomainFromEmail(1)).toBe('example.com');
  });

  it('getEmailLowercase returns lowercase when user found', () => {
    expect(service.getEmailLowercase(1)).toBe('alice@example.com');
  });
});
