import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Post } from 'src/app/shared/models/post';
import { DialogsService } from 'src/app/shared/notification/dialogs/dialogs.service';

@Component({
    selector: 'app-post-content',
    templateUrl: './post-content.component.html',
    styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit, OnChanges {

    @Input() post: Post;
    @Input() currentUsername: string;
    @Output() deletePost = new EventEmitter();
    isDisplay: boolean;

    constructor(private dialog: DialogsService) { }

    ngOnChanges(): void {
        // Check display button edit & delete post
        if (this.currentUsername && this.post && this.currentUsername === this.post.user.username) {
            this.isDisplay = true;
        } else {
            this.isDisplay = false;
        }
    }

    ngOnInit(): void { }

    /**
     * Format date
     * @param date date
     */
    formatDate(date: Date) {
        return moment(date).format('DD/MM/YYYY hh:mm:ss');
    }

    /**
     * Emit value post delete
     * @param slug post's slug
     */
    async delete(slug: string) {
        const result = await this.dialog.showConfirmDialog('Bạn có chắc chắn muốn xóa bài viết?').toPromise();
        if (result) {
            this.deletePost.emit(slug);
        }
    }

}
