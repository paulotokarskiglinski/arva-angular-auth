import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-edit.component.html',
  imports: [
    CommonModule,
    ToolbarComponent,
    MaterialModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
})
export class UserEditComponent implements OnInit {
  public loading = signal<boolean>(false);
  public readonly user = signal<User | null>(null);
  private snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly formBuilder = inject(FormBuilder);

  @Input({ required: true }) private readonly userId: number = 0;

  public userForm = this.formBuilder.group({
    id: [0, Validators.required],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    image: ['', []],
  });

  async ngOnInit(): Promise<void> {
    if (this.userId) {
      this.loading.set(true);
      this.user.set(await this.userService.getUser(this.userId));
      this.setForm();
      this.loading.set(false);
    }
  }

  private setForm(): void {
    const user = this.user();
    if (user) {
      this.userForm = this.formBuilder.group({
        id: [user.id, Validators.required],
        firstName: [user.firstName, [Validators.required]],
        lastName: [user.lastName, [Validators.required]],
        username: [user.username, [Validators.required]],
        email: [user.email, [Validators.email, Validators.required]],
        image: [user.image],
      });
    }
  }

  public back(): void {
    this.router.navigate(['user']);
    window.scroll(0, 0);
  }

  public async save(): Promise<void> {
    if (this.userForm.valid) {
      this.loading.set(true);
      const user = this.userForm.getRawValue() as User;
      await this.userService.putUser(user);

      this.snackBar.open('User updated successfully!', 'Close', {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });

      this.loading.set(false);
    } else {
      this.snackBar.open('Fill in the form correctly!', 'Close', {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
  }
}
