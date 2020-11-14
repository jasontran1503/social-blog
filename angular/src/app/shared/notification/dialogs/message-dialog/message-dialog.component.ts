import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  @Input() message: string;
  @Input() icon: string;
  @Input() color: string;

  constructor(private modalClose: BsModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.modalClose.hide();
  }

}
