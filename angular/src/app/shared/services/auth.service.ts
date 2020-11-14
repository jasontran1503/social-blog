import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataResponse } from '../models/data-response';
import { User } from '../models/user';

const url = 'http://localhost:3000/api/auth/';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    token: string;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * Get token
     */
    getToken(): string {
        return this.token;
    }

    /**
     * Check authentication
     */
    isAuthenticated(): Observable<DataResponse> {
        return this.http.get<DataResponse>(url + 'is-auth');
    }

    /**
     * Get current user
     */
    getCurrentUser(): Observable<DataResponse> {
        return this.http.get<DataResponse>(url + 'user')
            .pipe(map((response: DataResponse) => {
                if (response.success) {
                    this.currentUserSubject.next(response.data);
                }

                return response;
            }));
    }

    /**
     * Login
     * @param body email & password
     */
    login(body: { email: string, password: string }): Observable<any> {
        return this.http.post<DataResponse>(url + 'login', body);
    }

    /**
     * Register
     * @param body email, password & username
     */
    register(body: { email: string, password: string, username: string }) {
        return this.http.post<DataResponse>(url + 'register', body);
    }

    /**
     * Logout
     */
    logout() {
        this.currentUserSubject.next(null);
        return this.http.post<DataResponse>(url + 'logout', null);
    }

    /**
     * Send mail when register success
     * @param email email
     */
    sendMail(email: string) {
        return this.http.post<DataResponse>(url + 'send-mail', { email });
    }
}
