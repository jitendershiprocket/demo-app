import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { BugsDashboardComponent } from './components/bugs-dashboard/bugs-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BugsDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private userService = inject(UserService);
  title = 'Project Phoenix Demo';
  userId: number | null = this.userService.getUserId(1);
}
