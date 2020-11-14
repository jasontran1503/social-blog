import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from '../models/data-response';

const url = 'http://localhost:3000/api/';
const postUrl = 'post';
const commentUrl = 'comment';

@Injectable({
    providedIn: 'root'
})

export class PostService {

    constructor(private http: HttpClient) { }

    /**
     * Get all post
     * @param page page number
     */
    getAllPost(page): Observable<DataResponse> {
        const params = { page };
        return this.http.get<DataResponse>(url + postUrl, { params });
    }

    /**
     * Get post detail
     * @param slug post's slug
     */
    getPostDetail(slug: string): Observable<DataResponse> {
        const params = { slug };
        return this.http.get<DataResponse>(`${url}${postUrl}/detail`, { params });
    }

    /**
     * Create post
     * @param title post's title
     * @param content post's content
     */
    createPost(title: string, content: string): Observable<DataResponse> {
        const body = { title, content };
        return this.http.post<DataResponse>(`${url}${postUrl}/create`, body);
    }

    /**
     * Update post
     * @param title post's title
     * @param content post's content
     * @param slug post's slug
     */
    updatePost(title: string, content: string, slug: string): Observable<DataResponse> {
        const body = { title, content };
        const params = { slug };
        return this.http.put<DataResponse>(`${url}${postUrl}/update`, body, { params });
    }

    /**
     * Delete post
     * @param slug post's slug
     */
    deletePost(slug: string): Observable<DataResponse> {
        const params = { slug };
        return this.http.delete<DataResponse>(`${url}${postUrl}/delete`, { params });
    }

    /**
     * Create comment
     * @param content comment's content
     * @param slug post's slug
     */
    createComment(content: string, slug: string): Observable<DataResponse> {
        const body = { content, slug };
        return this.http.post<DataResponse>(`${url}${commentUrl}/create`, body);
    }

    /**
     * Update comment
     * @param content comment's content
     * @param commentId comment's id
     */
    updateComment(content: string, commentId: string): Observable<DataResponse> {
        const body = { content };
        const params = { commentId };
        return this.http.put<DataResponse>(`${url}${commentUrl}/update`, body, { params });
    }

    /**
     * Delete comment
     * @param commentId comment's id
     */
    deleteComment(commentId: string): Observable<DataResponse> {
        const params = { commentId };
        return this.http.delete<DataResponse>(`${url}${commentUrl}/delete`, { params });
    }

    /**
     * Favorite post
     * @param slug post's slug
     */
    favorite(slug: string): Observable<DataResponse> {
        const body = { slug };
        return this.http.post<DataResponse>(`${url}${postUrl}/favorite`, body);
    }

    /**
     * Unfavorite post
     * @param slug post's slug
     */
    unfavorite(slug: string): Observable<DataResponse> {
        const body = { slug };
        return this.http.post<DataResponse>(`${url}${postUrl}/unfavorite`, body);
    }

    /**
     * Get list favorite post
     * @param slug post's slug
     */
    getListFavorite(slug: string): Observable<DataResponse> {
        const params = { slug };
        return this.http.get<DataResponse>(`${url}${postUrl}/favorites`, { params });
    }

}
