import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Sentry from '@sentry/angular';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { truncate } from '../../utils/string-utils';
import { pickKeys } from '../../utils/object-utils';
import { formatPercent } from '../../lib/formatters';
import { formatHighlight } from '../../directives/highlight.helper';
import { findItemName } from '../search/search.helper';
import { RoleGuard } from '../../guards/role.guard';
import { matchPattern } from '../../utils/regex.utils';
import { SlugifyPipe } from '../../pipes/slugify.pipe';
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
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);
  private roleGuard = new RoleGuard();
  private slugifyPipe = new SlugifyPipe();

  bugs = KNOWN_BUGS;

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
            value = truncate(null, 10);
            label = 'Truncate';
            break;
          case 'bug-2':
            value = JSON.stringify(pickKeys(null));
            label = 'PickKeys';
            break;
          case 'bug-3':
            value = String(this.apiService.getStatus(null));
            label = 'Status';
            break;
          case 'bug-4':
            value = this.slugifyPipe.transform(null);
            label = 'Slugify';
            break;
          case 'bug-5':
            value = formatPercent(null);
            label = 'Percent';
            break;
          case 'bug-6':
            value = String(this.roleGuard.getRoleLevel(null));
            label = 'Role';
            break;
          case 'bug-7':
            value = formatHighlight(undefined);
            label = 'Highlight';
            break;
          case 'bug-8':
            value = findItemName([], 999);
            label = 'FindItem';
            break;
          case 'bug-9':
            value = JSON.stringify(this.storageService.getParsed('missing'));
            label = 'Storage';
            break;
          case 'bug-10':
            value = String(matchPattern('hello', '['));
            label = 'Regex';
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
