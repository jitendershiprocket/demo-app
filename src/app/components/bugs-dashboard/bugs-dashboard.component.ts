import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Sentry from '@sentry/angular';
import { UserService } from '../../services/user.service';
import { KNOWN_BUGS } from '../../data/bugs.data';
import { BugInfo } from '../../models/bug-info.model';

type FetchType = 'id' | 'email';

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
  result: { success: boolean; label: string; value: string } | null = null;
  loading = false;

  /** User ID 1,2 = valid. 999 = triggers bug (user not found) */
  fetchData(type: FetchType): void {
    this.loading = true;
    this.result = null;

    setTimeout(() => {
      try {
        if (type === 'id') {
          const id = this.userService.getUserId(this.inputId);
          this.result = {
            success: true,
            label: 'User ID',
            value: id !== null ? String(id) : 'User not found',
          };
        } else {
          const email = this.userService.getUserEmail(this.inputId);
          this.result = {
            success: true,
            label: 'Email',
            value: email ?? 'User not found',
          };
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        Sentry.captureException(err);
        this.result = {
          success: false,
          label: type === 'id' ? 'User ID' : 'Email',
          value: msg,
        };
      }
      this.loading = false;
    }, 300);
  }
}
