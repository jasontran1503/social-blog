import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Page } from 'src/app/shared/enum/page.enum';
import { DataResponse } from 'src/app/shared/models/data-response';
import { Post } from 'src/app/shared/models/post';
import { ToastMessageService } from 'src/app/shared/notification/toast-message/toast-message.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-list-page',
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.css'],
})
export class PostListPageComponent implements OnInit, OnDestroy {
  page = Page.PAGE_NUMBER;
  posts: Post[];
  postsCount: number;

  destroy$ = new Subject();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Default page: 1
    const defaultPage = Page.PAGE_NUMBER;
    this.getAllPost(defaultPage);
  }

  /**
   * Get all post
   * @param page page number
   */
  getAllPost(page: number) {
    this.postService
      .getAllPost(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: DataResponse<any>) => {
        if (response && response.success) {
          this.posts = response.data.posts;
          this.postsCount = response.data.postsCount;
        }
      });
  }

  /**
   * Change page by number
   * @param page page number
   */
  choosePage(page: number) {
    this.page = page;
    this.getAllPost(this.page);
  }

  /**
   * Change page by click next or previous
   * @param event event click
   */
  changePage(event) {
    this.page = event;
    this.getAllPost(this.page);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
