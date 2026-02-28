import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Sentry from '@sentry/angular';
import { UserProfileService } from '../../services/user-profile.service';
import { ConfigService } from '../../services/config.service';
import { CacheService } from '../../services/cache.service';
import { UppercasePipe } from '../../pipes/uppercase.pipe';
import { formatDate } from '../../utils/date-utils';
import { sanitize } from '../../lib/sanitize';
import { getTooltipLength } from '../../directives/tooltip.helper';
import { getAverage } from '../stats/stats.helper';
import { AuthGuard } from '../../guards/auth.guard';
import { splitBy } from '../../utils/split-utils';
import { KNOWN_BUGS } from '../../data/bugs.data';

type BugTrigger =
  | 'bug-1' | 'bug-2' | 'bug-3' | 'bug-4' | 'bug-5'
  | 'bug-6' | 'bug-7' | 'bug-8' | 'bug-9' | 'bug-10';

@Component({
  selector: 'app-bugs-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bugs-dashboard.component.html',
  styleUrl: './bugs-dashboard.component.scss',
})
export class BugsDashboardComponent {
  private userProfile = inject(UserProfileService);
  private configService = inject(ConfigService);
  private cacheService = inject(CacheService);
  private uppercasePipe = new UppercasePipe();
  private authGuard = new AuthGuard();

  bugs = KNOWN_BUGS;
  inputJson = '{invalid}';

  result: { success: boolean; label: string; value: string } | null = null;
  loading = false;

  triggerBug(bugId: BugTrigger): void {
    this.loading = true;
    this.result = null;

    setTimeout(() => {
      try {
        let value: string;
        let label: string;
        switch (bugId) {
          case 'bug-1':
            value = this.userProfile.getEmail(999);
            label = 'Email';
            break;
          case 'bug-2':
            value = JSON.stringify(this.configService.parseIds(this.inputJson));
            label = 'ParseIds';
            break;
          case 'bug-3':
            value = this.uppercasePipe.transform(null);
            label = 'Uppercase';
            break;
          case 'bug-4':
            value = formatDate(undefined);
            label = 'FormatDate';
            break;
          case 'bug-5':
            value = sanitize(null);
            label = 'Sanitize';
            break;
          case 'bug-6':
            value = this.authGuard.getRole(999);
            label = 'Role';
            break;
          case 'bug-7':
            value = String(getTooltipLength(undefined));
            label = 'Tooltip';
            break;
          case 'bug-8':
            value = String(getAverage(undefined));
            label = 'Average';
            break;
          case 'bug-9':
            value = this.cacheService.get('missing');
            label = 'Cache';
            break;
          case 'bug-10':
            value = JSON.stringify(splitBy(null, ','));
            label = 'Split';
            break;
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
    }, 100);
  }
}
