import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataResponse } from '../../models/data-response';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input() post: Post;
  @ViewChild('templateListFavorite', { static: true })
  templateListFavorite: ElementRef;
  isFavorite: boolean;
  favoritesCount: number;
  public modalRef: BsModalRef;
  listFavorite$: Observable<DataResponse<User[]>>;
  destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.favoritesCount = this.post.favorites.length;
    // Get current user
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: User) => {
        if (response) {
          this.checkFavoriteStatus(this.post.favorites, response._id);
        }
      });
  }

  /**
   * Favorite post
   */
  favorite() {
    this.postService
      .favorite(this.post.slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  /**
   * Unfavorite post
   */
  unfavorite() {
    this.postService
      .unfavorite(this.post.slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  /**
   * Check favorite status
   * @param listFavoritePost list favorite of post
   * @param userId user id
   */
  checkFavoriteStatus(listFavoritePost: string[], userId: string) {
    if (listFavoritePost.includes(userId)) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
  }

  /**
   * Toggle favorite status
   */
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // this.isClickButtonFavorite = true;
    if (this.isFavorite) {
      this.favoritesCount = this.favoritesCount + 1;
      this.favorite();
    } else {
      this.favoritesCount = this.favoritesCount - 1;
      this.unfavorite();
    }
  }

  showListFavorite() {
    this.modalRef = this.modalService.show(this.templateListFavorite, {
      // initialState,
      class: 'modal-dialog-centered',
    });
    this.getListFavorite();
  }

  /**
   * Get list favorite post
   * @param slug post's slug
   */
  getListFavorite() {
    this.listFavorite$ = this.postService.getListFavorite(this.post.slug);
  }
}
