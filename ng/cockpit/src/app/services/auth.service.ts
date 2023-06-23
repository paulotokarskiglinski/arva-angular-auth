import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Credential, LoginResult } from '../models/auth.model';
import * as API_URL from './../../assets/api-urls.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  public async login(credentials: Credential): Promise<LoginResult | unknown> {
    try {
      const result = (await firstValueFrom(
        this.http.post(this.apiUrl.authUrl, credentials),
      )) as LoginResult;
      this.authenticate(result.token);
      return result;
    } catch (e: unknown) {
      console.error('login error', e);
      return e;
    }
  }

  public logout(): void {
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('authentication');
  }

  public getToken(): string {
    return localStorage.getItem('authentication') || '';
  }

  private authenticate(token: string): void {
    localStorage.setItem('authentication', token);
  }
}
