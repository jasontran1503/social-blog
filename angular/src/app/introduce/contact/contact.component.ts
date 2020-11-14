import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact[];

  constructor() { }

  ngOnInit(): void {
    this.contact = [
      { title: 'full name', content: 'tran xuan son', class: 'fa fa-male' },
      { title: 'phone', content: '035 373 4878', class: 'fa fa-phone' },
      { title: 'date of birth', content: '15/03/1997', class: 'fa fa-birthday-cake' },
      { title: 'address', content: 'nhu quynh-van lam-hung yen', class: 'fa fa-map-marker' },
      { title: 'facebook', content: 'facebook.com/son.tranxuan.10', class: 'fa fa-facebook-square' },
      { title: 'email', content: 'tranxuanson1503@gmail.com', class: 'fa fa-envelope-open' },
      { title: 'github', content: 'github.com/jasontran1503', class: 'fa fa-github' },
      { title: 'university', content: 'water resources university', class: 'fa fa-graduation-cap' },
      { title: 'company', content: 'fpt software', class: 'fa fa-building' },
    ];
  }

}

export interface Contact {
  title: string;
  content: string;
  class: string;
}
