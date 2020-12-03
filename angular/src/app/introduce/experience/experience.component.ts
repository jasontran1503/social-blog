import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experience: Experience[];

  constructor() { }

  ngOnInit(): void {
    this.experience = [
      {
        companyName: 'FPT Software',
        time: '17/08/2020 - ',
        customer: 'KDDI Japan',
        description: '',
        role: 'Angular DEV',
      },
      {
        companyName: 'FPT Software',
        time: '01/06/2020 - 16/08/2020',
        customer: 'Viettel',
        description: '',
        role: 'Angular DEV',
      },
      {
        companyName: 'FPT Software',
        time: '08/04/2020 - 31/05/2020',
        customer: 'Viettel',
        description: '',
        role: 'Angular DEV',
      },
      {
        companyName: 'FPT Software',
        time: '01/03/2020 - 31/03/2020',
        customer: 'Viettel',
        // tslint:disable-next-line: max-line-length
        description:
          'Phát triển hệ thống BCCS3: quản lý khách hàng, chăm sóc khiếu nại khách hàng, quản lý bán hàng, quản lý sản phẩm, tổng hợp tính cước và tính hóa đơn, hệ thống thanh toán cước phí.',
        role: 'Angular DEV',
      },
    ];
  }
}

export interface Experience {
  companyName: string;
  time: string;
  customer: string;
  description: string;
  role: string;
}
