import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Sentry from '@sentry/angular';
import { UserService } from '../../services/user.service';
import { CalculatorService } from '../../services/calculator.service';
import { ConfigService } from '../../services/config.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { formatTimestamp } from '../../utils/date.utils';
import { firstId } from '../../utils/collection.utils';
import { calculateSubtotal } from '../order-card/order-card.helper';
import { AccessChecker } from '../../guards/access-checker';
import { ClickTrackerDirective } from '../../directives/click-tracker.directive';
import { validateRequired } from '../../lib/validators';
import { KNOWN_BUGS } from '../../data/bugs.data';

type BugTrigger =
  | 'bug-1' | 'bug-2' | 'bug-3' | 'bug-4' | 'bug-5'
  | 'bug-6' | 'bug-7' | 'bug-8' | 'bug-9' | 'bug-10';

@Component({
  selector: 'app-bugs-dashboard',
  standalone: true,
  imports: [FormsModule, CurrencyFormatPipe, ClickTrackerDirective],
  templateUrl: './bugs-dashboard.component.html',
  styleUrl: './bugs-dashboard.component.scss',
})
export class BugsDashboardComponent {
  private userService = inject(UserService);
  private calculatorService = inject(CalculatorService);
  private configService = inject(ConfigService);
  private currencyPipe = new CurrencyFormatPipe();
  private accessChecker = new AccessChecker();

  @ViewChild('directiveTrigger') directiveTrigger?: ElementRef<HTMLElement>;

  bugs = KNOWN_BUGS;
  inputUserId = 999;
  inputJson = '{invalid}';
  inputAccessUserId = 999;

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
          case 'bug-1': {
            const id = this.userService.getUserId(this.inputUserId);
            value = id !== null ? String(id) : 'Not found';
            label = 'User ID';
            break;
          }
          case 'bug-2': {
            value = this.currencyPipe.transform(null);
            label = 'Pipe';
            break;
          }
          case 'bug-3': {
            value = formatTimestamp(null);
            label = 'Utils';
            break;
          }
          case 'bug-4': {
            value = String(firstId([]));
            label = 'First ID';
            break;
          }
          case 'bug-5': {
            const ids = this.configService.parseIds(this.inputJson);
            value = JSON.stringify(ids);
            label = 'Parsed IDs';
            break;
          }
          case 'bug-6': {
            const sum = calculateSubtotal(undefined);
            value = sum.toFixed(2);
            label = 'Subtotal';
            break;
          }
          case 'bug-7': {
            this.directiveTrigger?.nativeElement.click();
            value = 'OK';
            label = 'Directive';
            break;
          }
          case 'bug-8': {
            const level = this.accessChecker.getAccessLevel(this.inputAccessUserId);
            value = String(level);
            label = 'Access Level';
            break;
          }
          case 'bug-9': {
            const ok = validateRequired(null);
            value = ok ? 'Valid' : 'Invalid';
            label = 'Required';
            break;
          }
          case 'bug-10': {
            const r = this.calculatorService.divide(10, 0);
            value = String(r);
            label = 'Divide';
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
    }, 100);
  }
}
