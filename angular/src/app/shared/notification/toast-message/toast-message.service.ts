import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastMessageComponent } from './toast-message.component';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  private showToast(message: string, icon: string, color: string) {
    const initialState = {
      message,
      icon,
      color,
    };
    this.modalRef = this.modalService.show(ToastMessageComponent, {
      id: 1,
      class: 'modal-dialog modal-sm',
      ignoreBackdropClick: true,
      initialState,
    });
    setTimeout(() => {
      this.modalService.hide(1);
    }, 1500);
  }

  showToastError(message: string) {
    return this.showToast(message, 'fa-minus-circle', 'error');
  }

  showToastSuccess(message: string) {
    return this.showToast(message, 'fa-check-circle', 'success');
  }

  showToastWarning(message: string) {
    return this.showToast(message, 'fa-exclamation-triangle', 'warning');
  }

  showToastInfo(message: string) {
    return this.showToast(message, 'fa-info-circle', 'info');
  }
}
