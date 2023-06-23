import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { Credential, LoginResult } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public loading = signal(false);
  public errorMessage = signal('');
  public passwordType = signal('password');

  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  public formLogin = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  public async login(): Promise<void> {
    if (this.formLogin.valid) {
      this.loading.set(true);
      this.formLogin.disable();

      const credentials = this.formLogin.getRawValue() as Credential;
      const result = (await this.authService.login(credentials)) as LoginResult;

      if (!result.error) this.router.navigate(['user']);
      else {
        this.loading.set(false);
        this.formLogin.reset();
        this.formLogin.enable();
        this.errorMessage.set(result.error.error);
      }
    }
  }

  public togglePassword(): void {
    this.passwordType.update((value: string) =>
      value === 'password' ? 'text' : 'password',
    );
  }
}
