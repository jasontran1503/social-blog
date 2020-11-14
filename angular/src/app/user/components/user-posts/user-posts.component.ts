import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  @Input() posts: Post[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Format date
   * @param date date
   */
  formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY hh:mm:ss');
  }

}
