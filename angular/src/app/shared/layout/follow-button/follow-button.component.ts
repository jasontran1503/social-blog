import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit, OnDestroy {
  @Input() user: User;
  isFollow: boolean;
  isDisplay: boolean;
  listFollowing: string[];
  destroy$ = new Subject();

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get current user
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: User) => {
        if (response) {
          // Check display follow button
          if (this.user.username === response.username) {
            this.isDisplay = false;
          } else {
            this.isDisplay = true;
          }
          this.listFollowing = response.following as string[];
          this.checkFollowStatus(this.listFollowing, this.user._id);
        }
      });
  }

  /**
   * Check follow status
   * @param listFollowingCurrentUser list following of current user
   * @param userId user id
   */
  checkFollowStatus(listFollowingCurrentUser: string[], userId: string) {
    if (listFollowingCurrentUser.includes(userId)) {
      this.isFollow = true;
    } else {
      this.isFollow = false;
    }
  }

  /**
   * Follow or unfollow
   */
  toggleFollow() {
    this.isFollow = !this.isFollow;
    if (this.isFollow) {
      this.listFollowing.push(this.user._id);
      this.checkFollowStatus(this.listFollowing, this.user._id);
      this.followUser();
    } else {
      const index = this.listFollowing.findIndex((x) => x === this.user._id);
      this.listFollowing.splice(index, 1);
      this.checkFollowStatus(this.listFollowing, this.user._id);
      this.unfollowUser();
    }
  }

  /**
   * Follow user
   */
  followUser() {
    this.userService
      .followUser(this.user.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  /**
   * Unfollow user
   */
  unfollowUser() {
    this.userService
      .unfollowUser(this.user.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
