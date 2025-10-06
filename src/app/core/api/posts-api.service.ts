import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {PostCommentModel, PostModel} from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class PostsApiService {
  private readonly API = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public getPosts(userId?: string | number): Observable<PostModel[]> {
    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId.toString());
    }
    return this.http.get<PostModel[]>(`${this.API}/posts`, { params });
  }

  public getCommentsByPostId(postId: string | number): Observable<PostCommentModel[]> {
    return this.http.get<PostCommentModel[]>(`${this.API}/posts/${postId}/comments`);
  }
}
