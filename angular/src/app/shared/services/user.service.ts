import { User } from 'src/app/shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataResponse } from '../models/data-response';
import { Post } from '../models/post';

const url = 'http://localhost:3000/api/';
const postUrl = 'post';
const userUrl = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  username$: BehaviorSubject<string>;
  usernameSubject: Observable<string>;

  constructor(private http: HttpClient) {
    this.username$ = new BehaviorSubject<string>(null);
    this.usernameSubject = this.username$.asObservable();
  }

  /**
   * Get user's post
   * @param username username
   * @param page page
   */
  getPostByUser(username: string, page): Observable<DataResponse<Post[]>> {
    const params = { username, page };
    return this.http.get<DataResponse<Post[]>>(`${url}${postUrl}/${userUrl}`, {
      params,
    });
  }

  /**
   * Get user profile
   * @param username username
   */
  getUserProfile(username: string): Observable<DataResponse<User>> {
    const params = { username };
    return this.http.get<DataResponse<User>>(`${url}${userUrl}/profile`, {
      params,
    });
  }

  /**
   * Follow user
   * @param username username
   */
  followUser(username: string): Observable<DataResponse<any>> {
    const body = { username };
    return this.http.post<DataResponse<any>>(`${url}${userUrl}/follow`, body);
  }

  /**
   * Unfollow user
   * @param username username
   */
  unfollowUser(username: string): Observable<DataResponse<any>> {
    const body = { username };
    return this.http.post<DataResponse<any>>(`${url}${userUrl}/unfollow`, body);
  }

  /**
   * Get user followers
   * @param username username
   */
  getUserFollowers(username: string): Observable<DataResponse<User[]>> {
    const params = { username };
    return this.http.get<DataResponse<User[]>>(`${url}${userUrl}/followers`, {
      params,
    });
  }

  /**
   * Get user following
   * @param username username
   */
  getUserFollowing(username: string): Observable<DataResponse<User[]>> {
    const params = { username };
    return this.http.get<DataResponse<User[]>>(`${url}${userUrl}/following`, {
      params,
    });
  }

  /**
   * Search user
   * @param username username
   */
  searchUser(username: string): Observable<DataResponse<User[]>> {
    const params = { username };
    return this.http.get<DataResponse<User[]>>(`${url}${userUrl}/search`, {
      params,
    });
  }
}
