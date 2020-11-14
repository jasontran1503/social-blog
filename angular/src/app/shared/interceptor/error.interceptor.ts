import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastMessageService } from '../notification/toast-message/toast-message.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toast: ToastMessageService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError((err: HttpErrorResponse) => {
                if (err.status === 500) {
                    this.toast.showToastError(err.error.message);
                }
                if (err.status === 404) {
                    this.router.navigate(['404']);
                }
                if (err.status === 401) {
                    this.toast.showToastError(err.error.message);
                    this.router.navigate(['/auth/login']);
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            }));
    }
}
