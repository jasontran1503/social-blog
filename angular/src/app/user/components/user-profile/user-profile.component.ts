import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/user';
import { ToastMessageService } from 'src/app/shared/notification/toast-message/toast-message.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() user: User;
  @Output() uploadAvatar = new EventEmitter();

  constructor(private toast: ToastMessageService) { }

  ngOnInit(): void { }

  /**
   * Format date
   * @param date date
   */
  formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY');
  }

  onUpload(event) {
    const avatarFile = event.target.files[0];
    const maxSize = 1 * 1024 * 1024;
    if (avatarFile.size > maxSize) {
      this.toast.showToastError('Ảnh tải lên không quá 1MB');
    } else if (!avatarFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      this.toast.showToastError('Ảnh tải lên không đúng định dạng');
    } else {
      this.uploadAvatar.emit(avatarFile);
    }
  }

}
