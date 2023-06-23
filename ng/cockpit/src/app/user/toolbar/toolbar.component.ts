import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'ckp-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [MaterialModule],
})
export class ToolbarComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
