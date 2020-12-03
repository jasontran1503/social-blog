import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { PostCrupdatePageComponent } from './pages/post-crupdate-page/post-crupdate-page.component';
import { PostDetailPageComponent } from './pages/post-detail-page/post-detail-page.component';
import { PostListPageComponent } from './pages/post-list-page/post-list-page.component';
import { PostComponent } from './post.component';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      { path: '', component: PostListPageComponent },
      { path: 'detail/:slug', component: PostDetailPageComponent },
      {
        path: 'create',
        component: PostCrupdatePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update/:slug',
        component: PostCrupdatePageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule { }
