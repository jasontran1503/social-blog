import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataResponse } from '../../models/data-response';
import { User } from '../../models/user';
import { DialogsService } from '../../notification/dialogs/dialogs.service';
import { ToastMessageService } from '../../notification/toast-message/toast-message.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isAuth: boolean;
    user: User;

    constructor(
        private authService: AuthService,
        private toast: ToastMessageService,
        private dialog: DialogsService,
        private router: Router) {
        this.isAuthenticated();
    }

    ngOnInit(): void {
        this.authService.currentUser.subscribe(user => {
            this.user = user;
        });
    }

    /**
     * Logout
     */
    async logout() {
        const result = await this.dialog.showConfirmDialog('Bạn có chắc chắn muốn đăng xuất?').toPromise();
        if (result) {
            this.authService.logout().subscribe((response: DataResponse) => {
                if (response && response.success) {
                    this.toast.showToastSuccess(response.message);
                    this.router.navigate(['/']);
                }
            });
        }
    }

    /**
     * Check authentication
     */
    isAuthenticated() {
        this.authService.isAuthenticated().subscribe((response: DataResponse) => {
            this.isAuth = response.data;
            if (this.isAuth) {
                this.authService.getCurrentUser().subscribe();
            }
        });
    }

}
