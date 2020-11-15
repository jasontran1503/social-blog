import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { ToastMessageService } from 'src/app/shared/notification/toast-message/toast-message.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() user: User;
  @Output() uploadAvatar = new EventEmitter();
  @ViewChild('uploadModal', { static: true }) uploadModal: ElementRef;
  isDisplay: boolean;
  modalRef: BsModalRef;
  destroy$ = new Subject();
  avatarFile: File;
  avatarUrl: string;

  constructor(
    private toast: ToastMessageService,
    private authService: AuthService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: User) => {
        if (response) {
          // Check display follow button
          if (this.user.username === response.username) {
            this.isDisplay = true;
          } else {
            this.isDisplay = false;
          }
        }
      });
  }

  /**
   * Format date
   * @param date date
   */
  formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY');
  }

  /**
   * Open modal upload
   */
  showUploadModal() {
    this.modalRef = this.modalService.show(this.uploadModal);
  }

  /**
   * Select avatar
   * @param event event
   */
  selectedAvatar(event) {
    this.avatarFile = event.target.files[0] as File;
    const maxSize = 1 * 1024 * 1024;
    if (!this.avatarFile) {
      this.toast.showToastError('Không có ảnh nào được chọn');
    } else if (this.avatarFile.size > maxSize) {
      this.toast.showToastError('Ảnh tải lên không quá 1MB');
    } else if (!this.avatarFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      this.toast.showToastError('Ảnh tải lên không đúng định dạng');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(this.avatarFile);
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
    }
  }

  /**
   * Emit file upload
   */
  upload() {
    this.uploadAvatar.emit(this.avatarFile);
    this.close();
  }

  /**
   * Close modal upload
   */
  close() {
    this.modalRef.hide();
    this.avatarUrl = null;
  }

}
