import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserSummaryPageComponent } from './pages/user-summary-page/user-summary-page.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PostModule } from '../post/post.module';
import { LayoutModule } from '../shared/layout/layout.module';

@NgModule({
  declarations: [
    UserComponent,
    UserSummaryPageComponent,
    UserPostsComponent,
    UserProfileComponent,
  ],
  imports: [CommonModule, PostModule, LayoutModule, UserRoutingModule],
  exports: [
    UserComponent,
    UserSummaryPageComponent,
    UserPostsComponent,
    UserProfileComponent,
  ],
})
export class UserModule { }
