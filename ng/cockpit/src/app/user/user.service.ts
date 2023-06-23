import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import * as API_URL from './../../assets/api-urls.json';
import { User, UserList } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = API_URL;
  private readonly httpClient = inject(HttpClient);

  async getUserList(skip = 0, limit = 30): Promise<UserList | null> {
    try {
      return await firstValueFrom(
        this.httpClient.get<UserList>(
          `${this.apiUrl.usersUrl}/users/?skip=${skip * limit}&limit=${limit}`,
        ),
      );
    } catch (e: unknown) {
      console.error('getUserList error', e);
      return null;
    }
  }

  async getUser(userId: number): Promise<User | null> {
    if (isNaN(userId) || userId < 1) {
      console.error(`User ID [${userId}] invalid`);
      return null;
    }
    try {
      return await firstValueFrom(
        this.httpClient.get<User>(`${this.apiUrl.usersUrl}/users/${userId}`),
      );
    } catch (e: unknown) {
      console.error('getUser error', e);
      return null;
    }
  }

  async putUser(user: User): Promise<User | null | unknown> {
    try {
      return await firstValueFrom(
        this.httpClient.put(`${this.apiUrl.usersUrl}/users/${user.id}`, user),
      );
    } catch (e: unknown) {
      console.error('putUser error', e);
      return e;
    }
  }
}
