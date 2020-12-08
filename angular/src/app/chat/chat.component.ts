import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message = '';

  constructor() { }

  ngOnInit(): void { }

  addMessage() {
    if (this.message.trim() === '') {
      return;
    }
    // logic add message here
    this.message = '';
  }
}
