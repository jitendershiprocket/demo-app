import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Sentry from '@sentry/angular';
import { MathService } from '../../services/math.service';
import { CalculatorService } from '../../services/calculator.service';
import { StorageService } from '../../services/storage.service';
import { repeatStr } from '../../utils/string-utils';
import { pickKeys } from '../../utils/object-utils';
import { safeInvoke } from '../../utils/call-utils';
import { sum } from '../../utils/array-utils';
import { toPrecisionSafe } from '../../lib/number-utils';
import { findItemName } from '../search/search.helper';
import { matchPattern } from '../../utils/regex.utils';
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
  private mathService = inject(MathService);
  private calculatorService = inject(CalculatorService);
  private storageService = inject(StorageService);

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
            value = repeatStr('x', -1);
            label = 'Repeat';
            break;
          case 'bug-2':
            value = String(this.mathService.factorial(-1));
            label = 'Factorial';
            break;
          case 'bug-3':
            value = String(this.calculatorService.divide(10, 0));
            label = 'Divide';
            break;
          case 'bug-4':
            value = String(safeInvoke(undefined));
            label = 'Invoke';
            break;
          case 'bug-5':
            value = String(sum([]));
            label = 'Sum';
            break;
          case 'bug-6':
            value = toPrecisionSafe(1.23, 0);
            label = 'Precision';
            break;
          case 'bug-7':
            value = JSON.stringify(this.storageService.getParsed('missing'));
            label = 'Storage';
            break;
          case 'bug-8':
            value = String(matchPattern('hello', '['));
            label = 'Regex';
            break;
          case 'bug-9':
            value = JSON.stringify(pickKeys(null));
            label = 'PickKeys';
            break;
          case 'bug-10':
            value = findItemName([], 999);
            label = 'FindItem';
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
