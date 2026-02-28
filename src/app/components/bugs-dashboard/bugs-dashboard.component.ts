import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Sentry from '@sentry/angular';
import { UserService } from '../../services/user.service';
import { KNOWN_BUGS } from '../../data/bugs.data';

type BugTrigger = 'bug-1' | 'bug-2' | 'bug-3' | 'bug-4' | 'bug-5';

@Component({
  selector: 'app-bugs-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bugs-dashboard.component.html',
  styleUrl: './bugs-dashboard.component.scss',
})
export class BugsDashboardComponent {
  private userService = inject(UserService);
  bugs = KNOWN_BUGS;
  inputId = 1;
  inputIndex = 5; // For bug-3: index 5 is out of bounds (only 2 users)
  result: { success: boolean; label: string; value: string } | null = null;
  loading = false;

  /** Trigger specific bug. Each sends different error to Sentry. */
  triggerBug(bugId: BugTrigger): void {
    this.loading = true;
    this.result = null;

    setTimeout(() => {
      try {
        let value: string;
        let label: string;
        switch (bugId) {
          case 'bug-1': {
            const id = this.userService.getUserId(this.inputId); // 999 → crash
            value = id !== null ? String(id) : 'User not found';
            label = 'User ID';
            break;
          }
          case 'bug-2': {
            const email = this.userService.getUserEmail(this.inputId); // 999 → crash
            value = email ?? 'User not found';
            label = 'Email';
            break;
          }
          case 'bug-3': {
            const name = this.userService.getNthUserName(this.inputIndex); // 5 → crash (only 2 users)
            value = name ?? 'User not found';
            label = 'Nth User Name';
            break;
          }
          case 'bug-4': {
            const domain = this.userService.getDomainFromEmail(this.inputId); // 999 → crash
            value = domain ?? 'User not found';
            label = 'Email Domain';
            break;
          }
          case 'bug-5': {
            const lower = this.userService.getEmailLowercase(this.inputId); // 999 → crash
            value = lower ?? 'User not found';
            label = 'Email Lowercase';
            break;
          }
        }
        this.result = { success: true, label: label!, value: value! };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        Sentry.captureException(err);
        const bug = KNOWN_BUGS.find((b) => b.id === bugId);
        this.result = {
          success: false,
          label: bug?.title ?? bugId,
          value: msg,
        };
      }
      this.loading = false;
    }, 300);
  }
}
