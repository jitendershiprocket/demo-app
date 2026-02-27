import { BugInfo } from '../models/bug-info.model';

export const KNOWN_BUGS: BugInfo[] = [
  {
    id: 'bug-1',
    title: 'Bug #1: getUserId — undefined access',
    description:
      'Calling getUserId() with non-existent user ID (e.g. 999) crashes because we access user.id when user is undefined.',
    errorMessage: "TypeError: Cannot read properties of undefined (reading 'id')",
    file: 'src/app/services/user.service.ts',
    line: 27,
    fixSuggestion: 'return user?.id ?? null',
    triggerLabel: 'Trigger Bug #1 (getUserId)',
  },
  {
    id: 'bug-2',
    title: 'Bug #2: getUserEmail — undefined access',
    description:
      'Calling getUserEmail() with non-existent user ID crashes because we access user.email when user is undefined.',
    errorMessage: "TypeError: Cannot read properties of undefined (reading 'email')",
    file: 'src/app/services/user.service.ts',
    line: 36,
    fixSuggestion: 'return user?.email ?? null',
    triggerLabel: 'Trigger Bug #2 (getUserEmail)',
  },
];
