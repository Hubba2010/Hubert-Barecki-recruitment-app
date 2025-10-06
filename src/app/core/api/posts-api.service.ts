import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PostCommentModel, PostModel} from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class PostsApiService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public getPosts(userId?: number): Observable<PostModel[]> {
    const url = userId
      ? `${this.apiUrl}/posts?userId=${userId}`
      : `${this.apiUrl}/posts`;
    return this.http.get<PostModel[]>(url);
  }

  public getCommentsByPostId(postId: number): Observable<PostCommentModel[]> {
    return this.http.get<PostCommentModel[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }
}
