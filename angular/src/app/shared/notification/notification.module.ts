import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ToastMessageComponent, ConfirmDialogComponent, MessageDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [ToastMessageComponent, ConfirmDialogComponent]
})
export class NotificationModule { }
