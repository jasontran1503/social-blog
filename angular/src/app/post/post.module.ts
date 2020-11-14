import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostDetailPageComponent } from './pages/post-detail-page/post-detail-page.component';
import { PostListPageComponent } from './pages/post-list-page/post-list-page.component';
import { PostComponent } from './post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostOverviewComponent } from './components/post-overview/post-overview.component';
import { PostSearchComponent } from './components/post-search/post-search.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { CommentComponent } from './components/comment/comment.component';
import { PostCrupdatePageComponent } from './pages/post-crupdate-page/post-crupdate-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { LayoutModule } from '../shared/layout/layout.module';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    PostDetailPageComponent,
    PostListPageComponent,
    PostCrupdatePageComponent,
    PostComponent,
    PostListComponent,
    PostOverviewComponent,
    PostSearchComponent,
    PostContentComponent,
    CommentComponent,
    EditCommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    LayoutModule,
    EditorModule,
    PostRoutingModule
  ],
  exports: [
    PostDetailPageComponent,
    PostListPageComponent,
    PostCrupdatePageComponent,
    PostComponent,
    PostListComponent,
    PostOverviewComponent,
    PostSearchComponent,
    PostContentComponent,
    CommentComponent,
    EditCommentComponent]
})
export class PostModule { }
