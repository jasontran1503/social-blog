import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Comment } from 'src/app/shared/models/comment';
import { DataResponse } from 'src/app/shared/models/data-response';
import { User } from 'src/app/shared/models/user';
import { ToastMessageService } from 'src/app/shared/notification/toast-message/toast-message.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
import { EditCommentComponent } from '../../components/edit-comment/edit-comment.component';

@Component({
    selector: 'app-post-detail-page',
    templateUrl: './post-detail-page.component.html',
    styleUrls: ['./post-detail-page.component.css']
})
export class PostDetailPageComponent implements OnInit, OnDestroy {

    post$: Observable<DataResponse>;
    slug: string;
    modalRef: BsModalRef;
    currentUsername: string;

    destroy$ = new Subject();

    constructor(
        private postService: PostService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: BsModalService,
        private toast: ToastMessageService) {
        // Get post's slug
        this.route.params
            .pipe(takeUntil(this.destroy$))
            .subscribe((params: Params) => {
                this.slug = params.slug;
            });
    }

    ngOnInit(): void {
        this.getPostDetail();
        // Get current username
        this.authService.currentUser
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: User) => {
                if (response) {
                    this.currentUsername = response.username;
                }
            });
    }

    /**
     * Get post detail
     */
    getPostDetail() {
        this.post$ = this.postService.getPostDetail(this.slug);
    }

    /**
     * Delete post
     * @param slug post's slug
     */
    deletePost(slug: string) {
        this.postService.deletePost(slug)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: DataResponse) => {
                if (response && response.success) {
                    this.toast.showToastSuccess(response.message);
                    this.router.navigate(['/post']);
                }
            });
    }

    /**
     * Create comment
     * @param content comment's content
     */
    createComment(content: string) {
        this.postService.createComment(content, this.slug)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: DataResponse) => {
                if (response && response.success) {
                    this.getPostDetail();
                }
            });
    }

    /**
     * Edit comment
     * @param content comment's content
     * @param commentId comment's id
     */
    editComment(content: string, commentId: string) {
        this.postService.updateComment(content, commentId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: DataResponse) => {
                if (response && response.success) {
                    this.getPostDetail();
                }
            });
    }

    /**
     * Show modal edit comment
     * @param comment comment
     */
    showEditComment(comment: Comment) {
        const initialState = { comment };
        this.modalRef = this.modalService.show(EditCommentComponent, {
            initialState,
            class: 'modal-dialog-centered'
        });

        // After modal close
        this.modalRef.content.eventEditComment.subscribe((content: string) => {
            this.editComment(content, comment._id);
        });
    }

    /**
     * Delete comment
     * @param commentId comment's id
     */
    deleteComment(commentId: string) {
        this.postService.deleteComment(commentId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: DataResponse) => {
                if (response && response.success) {
                    this.getPostDetail();
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
