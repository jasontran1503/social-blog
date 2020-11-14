import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Page } from 'src/app/shared/enum/page.enum';
import { DataResponse } from 'src/app/shared/models/data-response';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-summary-page',
  templateUrl: './user-summary-page.component.html',
  styleUrls: ['./user-summary-page.component.css']
})
export class UserSummaryPageComponent implements OnInit, OnDestroy {

  username: string;
  user$: Observable<DataResponse>;
  post$: Observable<DataResponse>;
  listFollowers$: Observable<DataResponse>;
  listFollowing$: Observable<DataResponse>;
  page = Page.PAGE_NUMBER;
  userRouteNumber = 1;

  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.username = params.username;
        userService.username$.next(this.username);
      });
  }

  ngOnInit(): void {
    const defaultPage = Page.PAGE_NUMBER;
    this.userService.usernameSubject.subscribe((usernameChange: string) => {
      this.getPostByUser(usernameChange, defaultPage);
      this.getUserProfile(usernameChange);
      this.getUserFollowers(usernameChange);
      this.getUserFollowing(usernameChange);
    });
  }

  changeUserRoute(userRouteNumber: number) {
    this.userRouteNumber = userRouteNumber;
  }

  /**
   * Get user's post
   * @param username username
   * @param page page
   */
  getPostByUser(username: string, page: number) {
    this.post$ = this.userService.getPostByUser(username, page);
  }

  /**
   * Get user profile
   * @param username username
   */
  getUserProfile(username: string) {
    this.user$ = this.userService.getUserProfile(username);
  }

  /**
   * Upload avatar
   * @param avatar image file
   */
  uploadAvatar(avatar: File) {
    this.userService.uploadAvatar(avatar)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log(response);
      });
  }

  /**
   * Get user followers
   */
  getUserFollowers(username: string) {
    this.listFollowers$ = this.userService.getUserFollowers(username);
  }

  /**
   * Get user following
   */
  getUserFollowing(username: string) {
    this.listFollowing$ = this.userService.getUserFollowing(username);
  }

  /**
   * Change page by number
   * @param page page number
   */
  choosePage(page: number) {
    this.page = page;
    this.getPostByUser(this.username, this.page);
  }

  /**
   * Change page by click next or previous
   * @param event event click
   */
  changePage(event) {
    this.page = event;
    this.getPostByUser(this.username, this.page);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
