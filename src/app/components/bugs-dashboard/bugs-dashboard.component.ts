import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Sentry from '@sentry/angular';
import { UserService } from '../../services/user.service';
import { CalculatorService } from '../../services/calculator.service';
import { FormatService } from '../../services/format.service';
import { InventoryService } from '../../services/inventory.service';
import { ConfigService } from '../../services/config.service';
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
  private calculatorService = inject(CalculatorService);
  private formatService = inject(FormatService);
  private inventoryService = inject(InventoryService);
  private configService = inject(ConfigService);

  bugs = KNOWN_BUGS;
  inputId = 999;
  inputA = 10;
  inputB = 0;
  inputIndex = 5;
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
          case 'bug-1': {
            const id = this.userService.getUserId(this.inputId);
            value = id !== null ? String(id) : 'Not found';
            label = 'User ID';
            break;
          }
          case 'bug-2': {
            const r = this.calculatorService.divide(this.inputA, this.inputB);
            value = String(r);
            label = 'Divide';
            break;
          }
          case 'bug-3': {
            const email = this.formatService.getUppercaseEmail(this.inputId);
            value = email ?? '';
            label = 'Uppercase Email';
            break;
          }
          case 'bug-4': {
            const name = this.inventoryService.getItemNameAt(this.inputIndex);
            value = name ?? '';
            label = 'Item Name';
            break;
          }
          case 'bug-5': {
            const ids = this.configService.parseIds(this.inputJson);
            value = JSON.stringify(ids);
            label = 'Parsed IDs';
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
