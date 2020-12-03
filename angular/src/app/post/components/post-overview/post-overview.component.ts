import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import * as moment from 'moment';

@Component({
  selector: 'app-post-overview',
  templateUrl: './post-overview.component.html',
  styleUrls: ['./post-overview.component.css'],
})
export class PostOverviewComponent implements OnInit {
  @Input() posts: Post[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void { }

  /**
   * Format date
   * @param date date
   */
  formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY hh:mm:ss');
  }
}
