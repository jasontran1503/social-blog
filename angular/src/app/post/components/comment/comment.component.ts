import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/shared/models/comment';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {

    @Input() comments: Comment[];
    @Input() currentUsername: string;
    @Output() createComment = new EventEmitter();
    @Output() showEditComment = new EventEmitter();
    @Output() deleteComment = new EventEmitter();

    formGroup: FormGroup;
    isDisplay: boolean;
    slug: string;
    submitted = false;

    constructor(private fb: FormBuilder) { }

    ngOnChanges(): void {
        // Check display button edit & delete comment
        if (this.comments && this.currentUsername) {
            if (this.comments.length > 0) {
                this.comments.forEach((comment: Comment) => {
                    if (
                        comment.user.username === this.currentUsername ||
                        comment.post.user.username === this.currentUsername
                    ) {
                        this.isDisplay = true;
                    } else {
                        this.isDisplay = false;
                    }
                });
            }
        }
    }

    ngOnInit(): void {
        this.formGroup = this.buildForm();
    }

    /**
     * Build form
     */
    buildForm() {
        return this.fb.group({
            content: ['', Validators.required]
        });
    }

    get f() {
        return this.formGroup.controls;
    }

    /**
     * Submit form
     */
    onSubmit() {
        this.formGroup.markAllAsTouched();
        this.submitted = true;
        if (this.formGroup.invalid) {
            return;
        }
        const content = this.formGroup.value.content;
        // Emit value form to create comment
        this.createComment.emit(content);
        this.formGroup.reset();
        this.submitted = false;
    }

    /**
     * Emit value edit comment
     * @param comment comment
     */
    editComment(comment: Comment) {
        this.showEditComment.emit(comment);
    }

    /**
     * Emit value delete comment
     * @param commentId commentId
     */
    onDeleteComment(commentId: string) {
        this.deleteComment.emit(commentId);
    }

}
