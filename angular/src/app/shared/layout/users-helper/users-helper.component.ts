import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-users-helper',
  templateUrl: './users-helper.component.html',
  styleUrls: ['./users-helper.component.css'],
})
export class UsersHelperComponent implements OnInit {
  @Input() listUser: User[];
  @Output() closeModal = new EventEmitter();
  destroy$ = new Subject();

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  navigateToUserPage(username: string) {
    this.router.navigate(['/', 'user', username]);
    this.closeModal.emit();
  }
}
