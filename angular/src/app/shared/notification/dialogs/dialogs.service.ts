import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogsService {

    modalRef: BsModalRef;

    constructor(private modalService: BsModalService) { }

    showConfirmDialog(message: string) {
        const initialState = {
            message
        };
        this.modalRef = this.modalService.show(ConfirmDialogComponent, {
            class: 'modal-dialog',
            ignoreBackdropClick: true,
            initialState
        });

        return this.modalRef.content.confirmClick as Observable<boolean>;
    }

    showSuccessDialog(message: string) {
        return this.showDialog(message, 'fa-check-circle', 'success');
    }

    showErrorDialog(message: string) {
        return this.showDialog(message, 'fa-minus-circle', 'danger');
    }

    private showDialog(message: string, icon: string, color: string) {
        const initialState = {
            message,
            icon,
            color
        };
        this.modalRef = this.modalService.show(MessageDialogComponent, {
            class: 'modal-dialog',
            ignoreBackdropClick: true,
            initialState
        });
    }
}
