import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../../material/material.module';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { UserList } from '../user.model';
import { UserService } from '../user.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarComponent,
    MaterialModule,
    InfiniteScrollModule,
    NgOptimizedImage,
  ],
})
export class UserListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private skip = signal<number>(0);
  readonly userList = signal<UserList | null>(null);

  public loading = signal<boolean>(false);

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    this.userList.set(await this.userService.getUserList());
    this.loading.set(false);
  }

  public edit(id: number): void {
    this.router.navigate(['user/' + id]);
    window.scroll(0, 0);
  }

  public async onScroll(): Promise<void> {
    const currentList = this.userList();

    if (currentList && currentList?.users.length < currentList?.total) {
      this.loading.set(true);
      this.skip.update((value) => value + 1);
      const list = await this.userService.getUserList(this.skip());

      this.userList.mutate((value) => {
        if (value && list) {
          value.skip = list.skip;
          value.limit = list.limit;
          value.total = list.total;
          value.users = [...value.users, ...list.users];
        }

        this.loading.set(false);
        return value;
      });
    }
  }
}
