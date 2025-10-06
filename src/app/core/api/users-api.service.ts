import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModel} from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly API = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.API}/users`);
  }

  /** Pobranie jednego użytkownika po ID */
  public getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.API}/users/${id}`);
  }
}
