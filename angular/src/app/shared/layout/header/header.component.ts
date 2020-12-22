import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataResponse } from '../../models/data-response';
import { User } from '../../models/user';
import { DialogsService } from '../../notification/dialogs/dialogs.service';
import { ToastMessageService } from '../../notification/toast-message/toast-message.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  user: User;
  @ViewChild('searchModal', { static: true }) searchModal: ElementRef;
  userSearch = new FormControl('');
  public modalRef: BsModalRef;
  listSearch$: Observable<DataResponse<User[]>>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toast: ToastMessageService,
    private dialog: DialogsService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.isAuthenticated();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
    this.userSearch.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value: string) => {
        this.listSearch$ = this.userService.searchUser(value);
      });
  }

  /**
   * Logout
   */
  async logout() {
    const result = await this.dialog
      .showConfirmDialog('Bạn có chắc chắn muốn đăng xuất?')
      .toPromise();
    if (result) {
      this.authService.logout().subscribe((response: DataResponse<any>) => {
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
    this.authService
      .isAuthenticated()
      .subscribe((response: DataResponse<boolean>) => {
        this.isAuth = response.data;
        if (this.isAuth) {
          this.authService.getCurrentUser().subscribe();
        }
      });
  }

  /**
   * Open search modal
   */
  openSearchModal() {
    this.modalRef = this.modalService.show(this.searchModal, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
    });
  }
}
